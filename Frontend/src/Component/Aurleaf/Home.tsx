import Appointment from '../Animation/Appointment';
import Infinite from '../Animation/Infinte';
import MiniShop from '../Animation/MiniShop';
import Customer from '../Animation/Rating';
import StepProcess from '../Animation/StepProcess';
import Button from '../Animation/Button';
import {useNavigate } from 'react-router';
import AyurvedicHealthSection from '../Animation/Infinte';
import ReviewForm from '../Rating/ReviewForm';






export default function Home() {


    
 

  return (
    // <div className="min-h-screen  text-gray-100 overflow-hidden">

    <>
     {/* <section className="w-full flex flex-col justify-center items-center pt-12 pb-20 bg-gradient-to-t from-amber-100 via-white to-transparent transition-all duration-700 ease-in-out"> */}
  

  <AyurvedicHealthSection/>
{/* </section> */}

<section className="w-full flex flex-col justify-center items-center pt-12 pb-20 bg-gradient-to-b from-amber-100 via-amber-100 to-amber-200">
  <h1 className="text-5xl text-center font-extrabold tracking-wide text-amber-700 m-10">

    Ayufit: AI-Powered Diet & Fitness for Better Health
  </h1>

  <h3 className="text-3xl text-center font-semibold text-amber-600 m-10">
    Struggling with diabetes, BP, or asthma? Get AI-powered diet & workout plans backed by Ayurveda!
  </h3>

  {/* <h1 className="text-6xl font-extrabold text-green-400 tracking-wide m-10">
    How It Works?
  </h1> */}

  <div className="w-full flex justify-center mt-6">
    <StepProcess />
  </div>
</section>















<section className="w-full flex flex-col justify-center items-center pt-12 pb-20 bg-gradient-to-b from-amber-200 via-amber-100 to-amber-200">
  <h1 className="text-5xl text-center font-extrabold tracking-wide text-amber-700 m-10">
  Ayumed: Your One-Stop Shop for Health & Wellness  </h1>

  <h3 className="text-3xl text-center font-semibold text-amber-600 m-10">
  Shop medical essentials and Ayurvedic solutions for a healthier life—trusted, safe, and effective.
  </h3>

  {/* <h1 className="text-6xl font-extrabold text-green-400 tracking-wide m-10">
    How It Works?
  </h1> */}

  <div className="w-full flex justify-center mt-6">
  <MiniShop />
  </div>
</section>






<section className="w-full flex flex-col justify-center items-center pt-12 pb-20 bg-gradient-to-b from-amber-100 via-amber-100 to-amber-100">
  <h1 className="text-5xl text-center font-extrabold tracking-wide text-amber-700 m-10">
  AyuDoctor: Find & Book Ayurvedic Doctors Near You
  </h1>

  <h3 className="text-3xl text-center font-semibold text-amber-600 m-10">
  Connect with expert Ayurvedic doctors and book hassle-free appointments for natural healing and wellness.
  </h3>

  

  <div className="w-full flex justify-center mt-6">
  <Appointment />
  </div>
</section>




      








<ReviewForm/>




      



     
    </>
  );
}
