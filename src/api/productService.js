
const API_BASE_URL = 'https://examen2dop20241108191931.azurewebsites.net/api/ProductsAndSales'; // Cambia esta URL según la configuración de tu servidor

export const fetchProducts = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items?q=${query}`);
    
    const text = await response.text(); 
    console.log(text); 

    const data = JSON.parse(text); 
    return data;

  } catch (error) {
    console.error('Error fetching products:', error);
    return []; 
  }
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/items/${id}`);
  return await response.json();
};

export const fetchPurchases = async () => {
  const response = await fetch(`${API_BASE_URL}/sales`);
  return await response.json();
};

export const addPurchase = async (purchaseData) => {
  const response = await fetch(`${API_BASE_URL}/addSale`, {
    method: 'POST',
    body: JSON.stringify(purchaseData),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error('Error en la compra:', errorDetails);
    return false;
  }

  return await response.json();
};


