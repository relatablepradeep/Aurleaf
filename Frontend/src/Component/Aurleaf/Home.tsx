import Appointment from '../Animation/Appointment';
import Infinite from '../Animation/Infinte';
import MiniShop from '../Animation/MiniShop';
import Customer from '../Animation/Rating';
import StepProcess from '../Animation/StepProcess';
import Button from '../Animation/Button';
import {useNavigate } from 'react-router';


export default function Home() {


    const navigate = useNavigate();
 

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900 text-gray-100 overflow-hidden">
      <section className="w-full flex flex-col justify-center items-center pt-12 pb-20 bg-gradient-to-t from-gray-950 via-gray-800 to-transparent">
        <h2 className="text-6xl text-center font-extrabold tracking-wide text-green-400">
          Personalized Care for a Healthier Tomorrow
        </h2>

        <h4 className="text-3xl text-center font-semibold text-gray-300 max-w-3xl mt-6">
          Your one-stop platform for Ayurvedic wellness, medical guidance, and smart health solutions.
        </h4>

        <div className="flex justify-center mt-6">
          <Button text="Nearby Hospitals" onClick={()=>navigate('/Pincode')} />
        </div>

        <h3 className="text-2xl text-center font-semibold text-green-300 tracking-wide m-10">
          Rooted in Ayurveda, Trusted by Many
        </h3>

        <Infinite />
      </section>

      <section className="w-full flex flex-col justify-center items-center pt-12 pb-20 bg-gradient-to-b from-gray-950 via-gray-950 to-transparent">
        <h1 className="text-5xl text-center font-extrabold tracking-wide text-green-400 m-10">
          Ayufit: AI-Powered Diet & Fitness for Better Health
        </h1>

        <h3 className="text-3xl text-center font-semibold text-gray-300 m-10">
          Struggling with diabetes, BP, or asthma? Get AI-powered diet & workout plans backed by Ayurveda!
        </h3>

        <h1 className="text-6xl font-extrabold text-green-400 tracking-wide m-10">
          How It Works?
        </h1>

        <div className="w-full flex justify-center mt-6">
          <StepProcess />
        </div>
      </section>

      <section className="w-full flex flex-col justify-center items-center pt-12 pb-10 bg-gradient-to-t from-gray-950 via-gray-950 to-transparent">
        <h1 className="text-6xl text-center font-extrabold tracking-wide text-green-400">
          Ayumed: Your One-Stop Shop for Health & Wellness
        </h1>

        <h3 className="text-3xl text-center font-semibold text-gray-300 max-w-3xl mt-6">
          Shop medical essentials and Ayurvedic solutions for a healthier life—trusted, safe, and effective.
        </h3>

        <div className="w-full flex justify-center mt-6">
          <MiniShop />
        </div>
      </section>

      <section className="w-full flex flex-col justify-center items-center pt-6 pb-20 bg-gradient-to-t from-black via-gray-950">
        <h1 className="text-6xl text-center font-extrabold tracking-wide m-5 text-green-400">
          AyuDoctor: Find & Book Ayurvedic Doctors Near You
        </h1>

        <h3 className="text-3xl text-center font-semibold text-gray-300 max-w-5xl mt-10">
          Connect with expert Ayurvedic doctors and book hassle-free appointments for natural healing and wellness.
        </h3>

        <div className="w-full flex justify-center mt-6">
          <Appointment />
        </div>
      </section>

      <Customer />

      
    </div>
  );
}
