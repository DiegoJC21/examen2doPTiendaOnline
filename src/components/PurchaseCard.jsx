import PropTypes from 'prop-types';

const PurchaseCard = ({ purchase }) => {
  return (
    <div className="purchase-card">
      <h3>{purchase.product.title}</h3>
      <p>Precio: ${purchase.product.price}</p>
      <p>Cantidad: {purchase.quantity}</p>
      <p>Fecha: {new Date(purchase.date).toLocaleDateString()}</p>
    </div>
  );
};

PurchaseCard.propTypes = {
  purchase: PropTypes.shape({
    product: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,  
  }).isRequired,
};

export default PurchaseCard;
