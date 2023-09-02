import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
Kommunicate.init("30b4dfef7097d37448b61620dc8428762", {
  automaticChatOpenOnNavigation: true,
  popupWidget: true,
});
