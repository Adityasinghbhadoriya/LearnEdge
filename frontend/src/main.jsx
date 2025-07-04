import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51R4fv6FhBT0Iuf5xVzCsSgozzdHmwtWwNRDkLFwGvohLt3EsMav57XBErrWd5sGMQvUNMB68g5ognpAKZ896rzMd002MfMorpP");
createRoot(document.getElementById('root')).render(


  <Elements  stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>

)
