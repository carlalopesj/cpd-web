import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginScreen';
import Dashboard from './pages/Dashboard';
import CoefficientScreen from './pages/CoefficientScreen';
import MovimentScreen from './pages/MovimentScreen';
import BoxReportScreen from './pages/BoxReportScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/coefficients" element={<CoefficientScreen />} />
      <Route path="/movimentacao" element={<MovimentScreen />} />
      <Route path="/boxes" element={<BoxReportScreen />} />
    </Routes>
  );
}

export default App;
