import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactGA from "react-ga4";

ReactGA.initialize("G-39VDMNK3NP");
ReactGA.send({ 
  hitType: "pageview", 
  page: " window.location.pathname", 
  title: " window.document.title" 
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


