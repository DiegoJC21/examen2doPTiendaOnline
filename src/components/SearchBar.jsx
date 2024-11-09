import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/items?search=${query}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleViewSales = () => {
    navigate('/sales'); 
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container text-center">
        <div className="mb-4">
          <i className="fas fa-store fa-5x"></i> 
          <h2>Bazar Online</h2>
        </div>

        <div className="input-group w-75 mx-auto mb-4">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Buscar productos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress} 
          />
          <button className="btn btn-primary btn-lg" onClick={handleSearch}>
            Buscar
          </button>
        </div>

        <button className="btn btn-secondary btn-lg" onClick={handleViewSales}>
          Ver Compras
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
