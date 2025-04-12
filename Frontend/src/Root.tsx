import { Outlet } from "react-router";
import Nav from './Component/Headers/Nav';
import Foot from './Component/Footer/Foot';
import Chatbot from "./Component/ChatBot/ChatBot";
import Translate from "./Component/Language/Translater";
import Config from './config/Config';

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn
} from '@clerk/clerk-react';

if (!Config.ClerkPublic) {
  throw new Error("Missing Publishable Key");
}

export default function Root() {
  return (
    <ClerkProvider
      publishableKey={Config.ClerkPublic}
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    >
      <SignedIn>
        <Nav />
        <Chatbot />
        <Translate />
        <Outlet />
        <Foot />
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}
