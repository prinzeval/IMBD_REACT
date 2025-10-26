import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactGA from "react-ga4";

// Apply theme before rendering to avoid flash
const applyTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const isDarkMode = savedTheme === null ? true : savedTheme === 'dark';
  document.body.classList.toggle('dark-mode', isDarkMode);
};

// Apply theme immediately
applyTheme();

ReactGA.initialize("G-TFQ78P950K");
ReactGA.send({
  hitType: "pageview",
  page: " window.location.pathname"
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


