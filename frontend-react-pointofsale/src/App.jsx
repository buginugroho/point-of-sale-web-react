import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import PaymentPage from './pages/PaymentPage';
import TransactionListPage from './pages/TransactionListPage';
import TransactionDetailPage from './pages/TransactionDetailPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProductPage />}/>
        <Route path='/payment' element={<PaymentPage />}/>
        <Route path='/transaction' element={<TransactionListPage />}/>
        <Route path='/transaction/:id' element={<TransactionDetailPage />}/>
        <Route path='/admin' element={<AdminPage />}/>
      </Routes>
    </>
  );
}

export default App
