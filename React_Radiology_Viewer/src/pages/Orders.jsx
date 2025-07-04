import React, { useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData as initialOrdersData, contextMenuItems, ordersGrid, gridOrderImage } from '../data/dummy';
import OrderAddForm from '../components/OrderAddForm';
import OrderImageModal from '../components/OrderImageModal';
import { Header } from '../components';

const Orders = () => {
  const [orders, setOrders] = useState(initialOrdersData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const editing = { allowDeleting: true, allowEditing: true };

  const handleAddOrder = (order) => {
    setOrders([order, ...orders]);
  };

  // Görsel tıklanınca modal aç
  const handleImageClick = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  // ordersGrid'in ilk sütununa özel template fonksiyonu ekle
  const customOrdersGrid = ordersGrid.map((col, idx) => {
    if (idx === 0) {
      return {
        ...col,
        template: (props) => gridOrderImage({ ...props, onImageClick: handleImageClick, order: props }),
      };
    }
    return col;
  });

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <OrderAddForm onAdd={handleAddOrder} />
      <GridComponent
        id="gridcomp"
        dataSource={orders}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customOrdersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
      <OrderImageModal open={modalOpen} onClose={() => setModalOpen(false)} order={selectedOrder} />
    </div>
  );
};
export default Orders;
