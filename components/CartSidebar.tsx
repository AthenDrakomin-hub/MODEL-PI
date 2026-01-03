import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { useDatabaseState } from '../src/hooks/useDatabaseState';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout?: () => void;
}

export const CartSidebar = ({ isOpen, onClose, onCheckout }: CartSidebarProps) => {
  const { cart, isLoading, removeItem, updateQuantity, totalPrice, totalItems } = useDatabaseState();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1001] bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-black border-l border-white/10 shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-black uppercase text-white">购物车</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        <div className="p-6 h-[calc(100vh-150px)] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500">加载中...</div>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <p className="mb-2">购物车为空</p>
                <p className="text-sm">添加商品到购物车开始预订</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.productId} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  {item.product?.image && (
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{item.product?.name || `产品 ${item.productId}`}</h3>
                    <p className="text-sm text-gray-400">¥{Number(item.product?.price || 0).toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-white w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeItem(item.productId)}
                        className="ml-2 p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="border-t border-white/10 pt-4 mt-6">
                <div className="flex justify-between text-lg font-bold text-white mb-4">
                  <span>总计:</span>
                  <span>¥{totalPrice.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => {
                    onClose();
                    if (onCheckout) {
                      onCheckout();
                    }
                  }}
                  className="w-full py-4 bg-red-600 text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-red-700 transition-colors"
                >
                  去结算
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};