
import React, { useRef, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';

// Yardımcı fonksiyon: iç içe ternary kaldırıldı
function getStatusBg(status) {
  if (status === 'pending') return '#FB9678';
  if (status === 'complete') return '#8BE78B';
  return '#03C9D7';
}

const OrderAddForm = ({ onAdd }) => {
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [customer, setCustomer] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('pending');
  const fileInput = useRef();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !desc || !amount || !customer || !location) return;
    onAdd({
      ProductImage: image,
      OrderItems: desc,
      TotalAmount: parseFloat(amount),
      CustomerName: customer,
      Location: location,
      Status: status,
      StatusBg: getStatusBg(status),
      OrderID: Date.now(),
    });
    setImage(null);
    setDesc('');
    setAmount('');
    setCustomer('');
    setLocation('');
    setStatus('pending');
    if (fileInput.current) fileInput.current.value = '';
  };

  const { currentColor } = useStateContext();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center mb-8 bg-main-bg dark:bg-secondary-dark-bg p-6 rounded-2xl shadow-md w-full">
      <div className="flex flex-col items-center justify-center">
        <label htmlFor="order-image-upload" className="w-24 h-24 flex items-center justify-center bg-gray-100 dark:bg-[#2a2d3e] rounded-full cursor-pointer border-2 border-dashed border-gray-300 hover:border-primary transition mb-2">
          {image ? (
            <img src={image} alt="preview" className="w-24 h-24 object-cover rounded-full" />
          ) : (
            <span className="text-gray-400 text-3xl">+</span>
          )}
        </label>
        <input id="order-image-upload" type="file" accept="image/*" onChange={handleImageChange} ref={fileInput} className="hidden" />
        <span className="text-xs text-gray-400">Resim Yükle</span>
      </div>
      <input type="text" placeholder="Açıklama" value={desc} onChange={(e) => setDesc(e.target.value)} className="border-0 border-b-2 border-gray-200 dark:bg-secondary-dark-bg focus:border-primary outline-none p-2 w-40 md:w-48 bg-transparent transition text-gray-900 dark:text-gray-100" />
      <input type="number" placeholder="Tutar" value={amount} onChange={(e) => setAmount(e.target.value)} className="border-0 border-b-2 border-gray-200 dark:bg-secondary-dark-bg focus:border-primary outline-none p-2 w-32 md:w-36 bg-transparent transition text-gray-900 dark:text-gray-100" />
      <input type="text" placeholder="Müşteri Adı" value={customer} onChange={(e) => setCustomer(e.target.value)} className="border-0 border-b-2 border-gray-200 dark:bg-secondary-dark-bg focus:border-primary outline-none p-2 w-40 md:w-48 bg-transparent transition text-gray-900 dark:text-gray-100" />
      <input type="text" placeholder="Lokasyon" value={location} onChange={(e) => setLocation(e.target.value)} className="border-0 border-b-2 border-gray-200 dark:bg-secondary-dark-bg focus:border-primary outline-none p-2 w-32 md:w-36 bg-transparent transition text-gray-900 dark:text-gray-100" />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border-0 border-b-2 border-gray-200 dark:bg-secondary-dark-bg focus:border-primary outline-none p-2 w-32 md:w-36 bg-transparent transition text-gray-900 dark:text-gray-100">
        <option value="pending">Beklemede</option>
        <option value="complete">Tamamlandı</option>
        <option value="active">Aktif</option>
      </select>
      <button
        type="submit"
        className="text-white px-6 py-2 rounded-lg shadow transition font-semibold mt-4 md:mt-0"
        style={{ background: currentColor, color: '#fff' }}
      >
        Ekle
      </button>
    </form>
  );
};

export default OrderAddForm;
