import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import Root from './Root';
import Fitness from './Component/Ayufit/Fitness'
import Home from './Component/Aurleaf/Home'
import Pincode from './Component/Pincode/Pincode'
import Diease from './Component/Ayufit/Diease'
import Ayumed from './Component/AyuMed/Ayumed'
import Ayudoctor from './Component/AyuMed/Ayudoctor'
import Ayumedical from './Component/Ayumedical/Ayumedical';
import BMI from './Component/BMI/BMI'







const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="fitness" element={<Fitness />} />
      <Route path="fitness/:diseaseId" element={<Diease />} />
      <Route path="hospitals" element={<Pincode />} />
      <Route path="doctors" element={<Ayumed />} />
      <Route path="products/:city" element={<Ayudoctor/>}/>
      <Route path="products" element={<Ayumedical />} />
      <Route path="BMI" element={<BMI />} />



    </Route>
  )
);


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />

);
