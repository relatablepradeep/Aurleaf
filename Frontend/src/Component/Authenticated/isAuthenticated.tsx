import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";



export default function isAuthenticated(){


    return(

       <>

<p className="text-gray-400">  
                Login/Signup


              </p>




              <SignedOut>
        <SignInButton />
      </SignedOut>
      
      <SignedIn>
        <UserButton />
      </SignedIn>
       
       
       
       </>
    )
}
