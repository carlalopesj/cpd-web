import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginScreen';
import Dashboard from './pages/Dashboard';
import CoefficientScreen from './pages/CoefficientScreen';
import MovimentScreen from './pages/MovimentScreen';
import BoxReportScreen from './pages/BoxReportScreen';
import DeletedBoxScreen from './pages/DeletedBoxScreen';
import AddUserScreen from './pages/AddUserScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/coefficients" element={<CoefficientScreen />} />
      <Route path="/moviment" element={<MovimentScreen />} />
      <Route path="/boxes" element={<BoxReportScreen />} />
      <Route path="/boxesdeleted" element={<DeletedBoxScreen />} />
      <Route path="/adduser" element={<AddUserScreen />} />
    </Routes>
  );
}

export default App;
