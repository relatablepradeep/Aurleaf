import Appointment from '../Animation/Appointment';
import MiniShop from '../Animation/MiniShop';
import StepProcess from '../Animation/StepProcess';
import AyurvedicHealthSection from '../Animation/Infinte';
import ReviewForm from '../Rating/ReviewForm';

export default function Home() {
  return (
    <>
      {/* Hero / Ayurvedic Health Section */}
      <AyurvedicHealthSection />

      {/* AyuFit Section */}
      <section className="w-full flex flex-col justify-center items-center pt-8 pb-16 px-4 sm:px-6 bg-gradient-to-b from-amber-100 via-amber-100 to-amber-200 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-amber-700 mb-6">
          Ayufit: AI-Powered Diet & Fitness for Better Health
        </h1>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-amber-600 mb-8">
          Struggling with diabetes, BP, or asthma? Get AI-powered diet & workout plans backed by Ayurveda!
        </h3>
        <div className="w-full flex justify-center mt-6">
          <StepProcess />
        </div>
      </section>

      {/* AyuMed Section */}
      <section className="w-full flex flex-col justify-center items-center pt-8 pb-16 px-4 sm:px-6 bg-gradient-to-b from-amber-200 via-amber-100 to-amber-200 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-amber-700 mb-6">
          Ayumed: Your One-Stop Shop for Health & Wellness
        </h1>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-amber-600 mb-8">
          Shop medical essentials and Ayurvedic solutions for a healthier life—trusted, safe, and effective.
        </h3>
        <div className="w-full flex justify-center mt-6">
          <MiniShop />
        </div>
      </section>

      {/* AyuDoctor Section */}
      <section className="w-full flex flex-col justify-center items-center pt-8 pb-16 px-4 sm:px-6 bg-gradient-to-b from-amber-100 via-amber-100 to-amber-100 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-amber-700 mb-6">
          AyuDoctor: Find & Book Ayurvedic Doctors Near You
        </h1>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-amber-600 mb-8">
          Connect with expert Ayurvedic doctors and book hassle-free appointments for natural healing and wellness.
        </h3>
        <div className="w-full flex justify-center mt-6">
          <Appointment />
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewForm />
    </>
  );
}
