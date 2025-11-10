import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/success" element={<CheckoutSuccessPage />} />
    </Routes>
  );
};

export default App;
