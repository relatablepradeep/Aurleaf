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
        <Outlet />
        <ScrollToTopButton />
        <Foot />
    
    
    
    </>
   
      
      

    
  );
}
