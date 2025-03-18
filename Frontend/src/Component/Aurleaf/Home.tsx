import Appointment from '../Animation/Appointment'
import Infinite from '../Animation/Infinte'
import MiniShop from '../Animation/MiniShop'
import Customer from '../Animation/Rating'
import StepProcess from '../Animation/StepProcess'



export default function Home(){

    return(
      <>


      <main>


        <h2>

        Personalized Care for a Healthier Tomorrow.
        </h2>
        <h4>Your one-stop platform for Ayurvedic wellness, medical guidance, and smart health solutions.</h4>

        <button type="submit">Nearby Hospitals</button>

        <h4>❗Your health is our priority—get help now</h4>
      </main>


      <Infinite/>


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