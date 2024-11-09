import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  
import ProductCard from './ProductCard';
import { fetchProducts } from '../api/productService';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");  
  const query = new URLSearchParams(useLocation().search).get('search');
  const navigate = useNavigate();  

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/items?search=${searchQuery}`);
    }
  };

  useEffect(() => {
    if (query) {
      console.log("Realizando búsqueda para:", query);  
      fetchProducts(query).then((data) => {
        console.log("Respuesta de la API:", data);  
        const productsArray = data?.$values || [];
        setProducts(productsArray);
      }).catch((error) => {
        console.error("Error al obtener productos:", error);
      });
    }
  }, [query]);

  return (
    <div className="search-results m-4">
      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', maxWidth: '600px', width: '100%', margin: '0 auto' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar productos..."
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
          <button type="submit" style={{
            padding: '10px 15px',
            fontSize: '16px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
            marginLeft: '10px'  
          }}>
            Buscar
          </button>
        </div>
      </form>

      <h2>Resultados de búsqueda para {query}: {products.length}</h2>

      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No se encontraron productos</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
