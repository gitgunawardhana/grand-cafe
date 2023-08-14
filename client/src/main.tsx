import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
Kommunicate.init("30b4dfef7097d37448b61620dc8428762", {
  automaticChatOpenOnNavigation: true,
  popupWidget: true
});