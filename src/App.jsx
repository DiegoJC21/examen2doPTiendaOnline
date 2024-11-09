import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import ProductDetail from './components/ProductDetail';
import PurchaseList from './components/PurchaseList';

const App = () => {
  return (
    <Router>
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/items" element={<SearchResults />} />
        <Route path="/item/:id" element={<ProductDetail />} />
        <Route path="/sales" element={<PurchaseList />} />
      </Routes>
    </div>
  </Router>
  
  
  );
};

export default App;
