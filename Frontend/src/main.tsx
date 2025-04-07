import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import Root from './Root';
import Fitness from './Component/Ayufit/Fitness'
import Home from './Component/Aurleaf/Home'
import Pincode from './Component/Pincode/Pincode'









const router = createBrowserRouter(
  createRoutesFromElements(

    
 
    <Route path="/" element={<Root />}>
      <Route path="" element={<Home />} /> 

      <Route path="fitness" element={<Fitness />} /> 
      <Route path="/Pincode" element={<Pincode/>} /> 

    </Route>


  )
);


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />

);
