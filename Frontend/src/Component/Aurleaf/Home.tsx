import Appointment from '../Animation/Appointment';
import MiniShop from '../Animation/MiniShop';
import StepProcess from '../Animation/StepProcess';
import AyurvedicHealthSection from '../Animation/Infinte';
import ReviewForm from '../Rating/ReviewForm';






export default function Home() {


    
 

  return (

    <>
  

  <AyurvedicHealthSection/>

<section className="w-full flex flex-col justify-center items-center pt-12 pb-20 bg-amber-50 from-amber-500 via-amber-600 to-amber-500">
  <h1 className="text-5xl text-center font-extrabold tracking-wide text-amber-700 m-10">

    Ayufit: AI-Powered Diet & Fitness for Better Health
  </h1>

  <h3 className="text-3xl text-center font-semibold text-amber-600 m-10">
    Struggling with diabetes, BP, or asthma? Get AI-powered diet & workout plans backed by Ayurveda!
  </h3>

  
  <div className="w-full flex justify-center mt-6">
    <StepProcess />
  </div>
</section>















<section className="w-full flex flex-col justify-center items-center pt-12 pb-20 bg-amber-50 from-amber-500 via-amber-600 to-amber-500">
  <h1 className="text-5xl text-center font-extrabold tracking-wide text-amber-700 m-10">
  Ayumed: Your One-Stop Shop for Health & Wellness  </h1>

  <h3 className="text-3xl text-center font-semibold text-amber-600 m-10">
  Shop medical essentials and Ayurvedic solutions for a healthier life—trusted, safe, and effective.
  </h3>

  

  <div className="w-full flex justify-center mt-6">
  <MiniShop />
  </div>
</section>






<section className="w-full flex flex-col justify-center items-center pt-12 pb-20 bg-amber-50 from-amber-100 via-amber-100 to-amber-100">
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
