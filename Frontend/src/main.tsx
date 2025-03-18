import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import Root from './Root';
import Fitness from './Component/Ayufit/Fitness'
import Home from './Component/Aurleaf/Home'

// Corrected router setup
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="" element={<Home />} /> 

      <Route path="fitness" element={<Fitness />} /> 
    </Route>
  )
);

// Rendering the app
createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
