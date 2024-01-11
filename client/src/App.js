
import './App.css';
import { Routes,Route } from 'react-router-dom';
import HomePage from './Component/HomePage';
import CartItemPage from './Component/CartItemPage';
import ProductPage from './Component/ProductPage';
import ordercomplete from './Component/ordercomplete';
import SingleProductPage from './Component/SingleProductPage';

function App() {
  return (

<div className='App'>
  <Routes>
  <Route path='/' Component={HomePage} exact/>
  <Route path='/product' Component={ProductPage}/>
  <Route path='/CartItemPage' Component={CartItemPage}/>
  <Route path='/completeorder' Component={ordercomplete}/>
  <Route path='/SingleProduct/:id' element={<SingleProductPage />} />

  </Routes>
  


</div>

  );
}

export default App;
