import React from 'react';

const OrderImageModal = ({ open, onClose, order }) => {
  if (!open || !order) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-all">
      <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl shadow-lg p-6 max-w-md w-full relative animate-fade-in">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold focus:outline-none"
          aria-label="Kapat"
        >
          &times;
        </button>
        <img
          src={order.ProductImage}
          alt={order.OrderItems}
          className="w-full max-w-[480px] h-[420px] object-contain rounded-2xl mb-4 border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#23243a]"
        />
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{order.OrderItems}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Müşteri: <span className="font-medium text-gray-700 dark:text-gray-300">{order.CustomerName}</span></p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tutar: <span className="font-medium text-primary">{order.TotalAmount} ₺</span></p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Lokasyon: <span className="font-medium text-gray-700 dark:text-gray-300">{order.Location}</span></p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: order.StatusBg, color: '#fff' }}>{order.Status}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderImageModal;
