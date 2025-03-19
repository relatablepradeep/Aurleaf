import Appointment from '../Animation/Appointment'
import Infinite from '../Animation/Infinte'
import MiniShop from '../Animation/MiniShop'
import Customer from '../Animation/Rating'
import StepProcess from '../Animation/StepProcess'
import Button from '../Animation/Button'





export default function Home(){

    return(
      <>

<main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100 overflow-hidden">
  <h2 className="text-6xl text-center m-10 font-extrabold tracking-wide text-green-400">
    Personalized Care for a Healthier Tomorrow
  </h2>

  <h4 className="text-3xl text-center m-10 font-semibold text-gray-300">
    Your one-stop platform for Ayurvedic wellness, medical guidance, and smart health solutions
  </h4>

  <div className="flex justify-center">
    <Button 
      text="Nearby Hospitals"
      onClick={() => console.log("button is clicked")}
    />
   
  </div>

  <h4 className="text-2xl text-center m-10 text-red-400 font-bold">
    ❗Your health is our priority, get help now
  </h4>

  <Infinite />

  <h3 className="text-2xl text-center m-5 font-semibold text-green-300 tracking-wide">
    Healing, Preferred by Many
  </h3>
</main>







      

<main>

<h1>Ayufit: AI-Powered Diet & Fitness for Better Health</h1>
<h3>Struggling with diabetes, blood pressure, or asthma? Get personalized diet and workout plans tailored to your health needs—powered by AI and backed by Ayurveda.</h3>


</main>
<div>
<h1>How It Works?</h1>
<StepProcess/>

</div>


<main>
<h1>Ayumed: Your One-Stop Shop for Health & Wellness</h1>
<h3>Shop medical essentials and Ayurvedic solutions for a healthier life—trusted, safe, and effective.</h3>
</main>

<div>
<MiniShop/>
</div>







      <main>
        <h1>AyuDoctor: Find & Book Ayurvedic Doctors Near You</h1>
        <h3>Connect with expert Ayurvedic doctors and book hassle-free appointments for natural healing and wellness.</h3>
      </main>

      <div>
        <Appointment/>
      </div>


      <main>
        <h2>Your Health, Your Story</h2>
      </main>

      <div>
        <Customer/>
      </div>





      
      
      </>
    )
}