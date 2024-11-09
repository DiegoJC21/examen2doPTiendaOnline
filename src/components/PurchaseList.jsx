import { useEffect, useState } from 'react';
import { fetchPurchases } from '../api/productService';
import PurchaseCard from './PurchaseCard';

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchases().then((data) => {
      const purchaseArray = data?.$values || [];
      setPurchases(purchaseArray);
    });
  }, []);

  return (
    <div className="purchase-list m-4">
      <h2>Compras Registradas</h2>
      {purchases.length > 0 ? (
        purchases.map((purchase) => (
          <PurchaseCard key={purchase.id} purchase={purchase} />
        ))
      ) : (
        <p>No hay compras registradas.</p>
      )}
    </div>
  );
};

export default PurchaseList;
