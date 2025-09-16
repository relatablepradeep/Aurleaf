import { Outlet } from "react-router";
import Nav from './Component/Headers/Nav';
import Foot from './Component/Footer/Foot';
import Chatbot from "./Component/ChatBot/ChatBot";
import Translate from "./Component/Language/Translater";
import ScrollToTopButton from "./Component/ScrollToTopButton";
import ScrollToTop from "./Component/ScrollToTop";


export default function Root() {
  return (


    <>


     <Nav />
        <Chatbot />
        <Translate />
        <ScrollToTop/>
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
        <ScrollToTopButton />
        <Foot />
    
    
    
    </>
   
      
      

    
  );
}
