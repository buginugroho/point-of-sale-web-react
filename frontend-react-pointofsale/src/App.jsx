import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import PaymentPage from './pages/PaymentPage';
import TransactionListPage from './pages/TransactionListPage';
import TransactionDetailPage from './pages/TransactionDetailPage';
import ProductListPage from './pages/ProductListPage';
import ProductFormPage from './pages/ProductFormPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProductPage />}/>
        <Route path='/payment' element={<PaymentPage />}/>
        <Route path='/transaction' element={<TransactionListPage />}/>
        <Route path='/transaction/:id' element={<TransactionDetailPage />}/>
        <Route path='/admin' element={<ProductListPage />}/>
        <Route path='/admin/product/:id' element={<ProductDetailPage />}/>
        <Route path='/admin/newProduct' element={<ProductFormPage />}/>
        <Route path='/admin/newProduct/:id' element={<ProductFormPage />}/>
      </Routes>
    </>
  );
}

export default App
