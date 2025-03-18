import { Outlet } from "react-router";
import Nav from './Component/Headers/Nav'
import Foot from './Component/Footer/Foot'




export default function Root(){
    return(
        <>

        <Nav/>
        <Outlet/>
        <Foot/>
        
        
        </>
    )
}