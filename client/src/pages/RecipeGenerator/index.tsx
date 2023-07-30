import { useContext } from "react";
import ChefBotText from "../../assets/images/ChefBotText.svg";
import RecipeGeneratorBg from "../../assets/images/RecipeGeneratorBg.svg";
import RecipeGeneratorBgHide from "../../assets/images/RecipeGeneratorBgHide.svg";
import ChatBox from "../../components/ChatBox";
import { ProviderContext } from "../../components/Provider";

const chatBoxBgStyle = {
  backgroundImage: `url(${RecipeGeneratorBgHide})`,
  backgroundSize: "90%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right",
};
const Main = () => {
  const { windowSize } = useContext(ProviderContext);
  return (
    <div className="-mb-5 !bg-gradient-to-r from-[#0c0702] to-black">
      <div className="grid grid-cols-1 overflow-hidden md:grid-cols-12">
        <div className="-pb-5 col-span-7 mb-0 flex justify-center">
          {windowSize.width < 770
            ? ChatBoxCompo(chatBoxBgStyle)
            : ChatBoxCompo()}
        </div>
        <div
          style={{
            backgroundImage: `url(${RecipeGeneratorBg})`,
            backgroundSize: "90%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
          }}
          className="col-span-5 hidden md:block"
        >
          <img src={ChefBotText} className="-ml-10 w-96 md:mt-56 lg:mt-28" />
        </div>
      </div>
    </div>
  );
};

export default Main;

function ChatBoxCompo(chatBoxBgStyle?: {
  backgroundImage: string;
  backgroundSize: string;
  backgroundRepeat: string;
  backgroundPosition: string;
}) {
  return (
    <div className="!w-full px-1 md:pl-12 md:pr-28" style={chatBoxBgStyle}>
      <ChatBox />
    </div>
  );
}
