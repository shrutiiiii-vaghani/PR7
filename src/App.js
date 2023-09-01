import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Add from './Add';
import View from './View';
import Edit from './Edit';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
     <BrowserRouter>
       <Routes>
         <Route path='/' element={<Add/>}></Route>
         <Route path='/view' element={<View/>}></Route>
         <Route path='/edit/:id' element={<Edit/>}></Route>
       </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
