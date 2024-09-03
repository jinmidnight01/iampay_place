import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import RecordPage from './pages/RecordPage/RecordPage';
import PriceInputPage from './pages/PaymentPage/PriceInputPage';
import CameraPage from './pages/PaymentPage/CameraPage';
import PaymentSuccessPage from './pages/PaymentPage/PaymentSuccessPage';
import PaymentFailPage from './pages/PaymentPage/PaymentFailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/record" element={<RecordPage/>} />
      <Route path="/priceinput" element={<PriceInputPage/>} />
      <Route path="/camera" element={<CameraPage/>} />
      <Route path="/paymentsuccess" element={<PaymentSuccessPage/>} />
      <Route path="/paymentfail" element={<PaymentFailPage/>} />
      <Route path={"*"} element={<NotFoundPage />}/>
    </Routes>
  );
}

export default App;
