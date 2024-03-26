import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import PaymentPage from './pages/PaymentPage';
import TransactionListPage from './pages/TransactionListPage';
import TransactionDetailPage from './pages/TransactionDetailPage';
import AdminPage from './pages/AdminPage';
import AdminFormPage from './pages/AdminFormPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProductPage />}/>
        <Route path='/payment' element={<PaymentPage />}/>
        <Route path='/transaction' element={<TransactionListPage />}/>
        <Route path='/transaction/:id' element={<TransactionDetailPage />}/>
        <Route path='/admin' element={<AdminPage />}/>
        <Route path='/admin/newProduct' element={<AdminFormPage />}/>
        <Route path='/admin/newProduct/:id' element={<AdminFormPage />}/>
      </Routes>
    </>
  );
}

export default App
