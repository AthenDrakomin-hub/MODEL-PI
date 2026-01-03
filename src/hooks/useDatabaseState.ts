import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

// Helper to get or create a session ID
function getSessionId() {
  let id = localStorage.getItem("tesla_cart_session");
  if (!id) {
    id = uuidv4();
    localStorage.setItem("tesla_cart_session", id);
  }
  return id;
}

export type CartItem = {
  productId: number;
  quantity: number;
  product?: {
    id: number;
    name: string;
    price: string;
    image: string;
  };
};

export function useDatabaseState() {
  const sessionId = getSessionId();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch initial state from server
  const { data: serverCart, isLoading } = useQuery({
    queryKey: [api.cart.list.path, sessionId],
    queryFn: async () => {
      const url = buildUrl(api.cart.list.path, { sessionId });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch cart");
      return api.cart.list.responses[200].parse(await res.json());
    },
  });

  // Local state for optimistic updates
  const [cart, setCart] = useState<CartItem[]>([]);

  // Sync server state to local state on load
  useEffect(() => {
    if (serverCart) {
      const formattedCart = serverCart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        product: item.product,
      }));
      setCart(formattedCart);
    }
  }, [serverCart]);

  // Mutation to sync with DB
  const syncMutation = useMutation({
    mutationFn: async (newCart: CartItem[]) => {
      const url = buildUrl(api.cart.sync.path, { sessionId });
      const payload = {
        items: newCart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Sync failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.cart.list.path, sessionId] });
    },
    onError: () => {
      toast({
        title: "Sync Error",
        description: "Could not save your cart. Please check your connection.",
        variant: "destructive",
      });
    },
  });

  // Wrapper to update state and trigger sync
  const updateCart = useCallback(
    (newCart: CartItem[]) => {
      setCart(newCart);
      syncMutation.mutate(newCart);
    },
    [syncMutation]
  );

  const addItem = (product: any) => {
    const existing = cart.find((item) => item.productId === product.id);
    let newCart;
    if (existing) {
      newCart = cart.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { productId: product.id, quantity: 1, product }];
    }
    updateCart(newCart);
    toast({
      title: "Added to Cart",
      description: `${product.name} added.`,
    });
  };

  const removeItem = (productId: number) => {
    const newCart = cart.filter((item) => item.productId !== productId);
    updateCart(newCart);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return removeItem(productId);
    const newCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    updateCart(newCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  return {
    cart,
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems: cart.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: cart.reduce(
      (acc, item) => acc + (Number(item.product?.price || 0) * item.quantity),
      0
    ),
  };
}
