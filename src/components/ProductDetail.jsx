import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, addPurchase } from '../api/productService'; 

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [product, setProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");  

  useEffect(() => {
    fetchProductById(id).then((data) => {
      console.log('Datos del producto:', data);  
      setProduct(data);
    });
  }, [id]);

  if (!product) return <div>Cargando...</div>;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); 
    const halfStar = rating % 1 >= 0.5; 
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); 
  
    return (
      <>
        {Array(fullStars).fill(<i className="fas fa-star text-warning"></i>)} 
        {halfStar && <i className="fas fa-star-half-alt text-warning"></i>} 
        {Array(emptyStars).fill(<i className="far fa-star text-warning"></i>)} 
      </>
    );
  };

  const handlePurchase = () => {
    const purchaseData = {
      id: 0,
      productId: product.id,
      date: new Date().toISOString(),
      quantity: 1,
      totalPrice: product.price * 1
    };

    console.log("Datos de la compra que se enviarán:", JSON.stringify(purchaseData, null, 2));

    addPurchase(purchaseData).then((response) => {
      if (response) {
        alert('Compra registrada exitosamente!');
      } else {
        alert('Error al registrar la compra');
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/items?search=${searchQuery}`); 
    }
  };

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <form onSubmit={handleSearch} className="d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar producto por ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <button type="submit" className="btn btn-primary ms-2">Buscar</button>
        </form>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="text-center mb-4">
            <h2 className="card-title">{product.title}</h2>

            <div className="d-flex justify-content-center mb-4">
              {product.productImages?.$values?.slice(0, 2).map((imgObj, index) => (
                <img
                  key={index}
                  src={imgObj.url || imgObj.imageUrl || imgObj.path} 
                  alt={product.title}
                  className="rounded-circle mx-2"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              ))}
            </div>
          </div>

          <div className="text-center mb-3">
            <p className="card-text"><strong></strong> {product.category}</p>
            <p className="card-text">{product.description}</p>
            <p className="card-text"><strong>Precio:</strong> ${product.price}</p>

            <div className="mb-3">
              <span className="ms-2">{renderStars(product.rating)}</span> 
            </div>

            <button className="btn btn-primary" onClick={handlePurchase}>Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
