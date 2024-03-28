import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
Kommunicate.init("278def5cbbe10bd5c0cbaa7965bd03497", {
  automaticChatOpenOnNavigation: true,
  popupWidget: true,
});
