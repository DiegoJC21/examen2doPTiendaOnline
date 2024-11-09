import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

const ProductCard = ({ product }) => {
  return (
    <div className="product-card d-flex align-items-center border p-3 mb-4 rounded shadow-sm">
      <div className="product-image me-3">
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%', 
            objectFit: 'cover', 
          }}
        />
      </div>

      <div className="product-details">
        <h3 className="mb-2" style={{ fontSize: '1.5rem' }}>
          {product.title} <small className="text-muted">({product.category})</small>
        </h3>

        <p className="mb-1">{product.description}</p>

        <p className="mb-1">
          Precio: ${product.price} {' '}
          <span className="ms-2">{renderStars(product.rating)}</span> 
        </p>

        <Link to={`/item/${product.id}`} className="text-primary">
          Ver Detalle
        </Link>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired, 
    rating: PropTypes.number.isRequired, 
  }).isRequired,
};

export default ProductCard;
