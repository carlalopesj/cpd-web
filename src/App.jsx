import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginScreen';
import Dashboard from './pages/Dashboard';
import CoefficientScreen from './pages/CoefficientScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/coefficients" element={<CoefficientScreen />} />
    </Routes>
  );
}

export default App;
