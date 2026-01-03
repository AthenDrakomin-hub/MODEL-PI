import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useDatabaseState } from '../src/hooks/useDatabaseState';

export const CartIcon = ({ onClick }: { onClick?: () => void }) => {
  const { totalItems } = useDatabaseState();
  
  return (
    <div 
      className="relative p-3 rounded-full border border-white/10 hover:bg-white/5 transition-all cursor-pointer"
      onClick={onClick}
    >
      <ShoppingCart size={20} className="text-white" />
      {totalItems > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </div>
      )}
    </div>
  );
};