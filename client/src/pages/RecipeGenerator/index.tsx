import { useContext } from "react";
import ChefBotText from "../../assets/images/ChefBotText.svg";
import RecipeGeneratorBg from "../../assets/images/RecipeGeneratorBg.svg";
import RecipeGeneratorBgHide from "../../assets/images/RecipeGeneratorBgHide.svg";
import { Button } from "../../base-components/Button";
import ChatBox from "../../components/ChatBox";
import { ProviderContext } from "../../components/Provider";

const chatBoxBgStyle = {
  backgroundImage: `url(LKR{RecipeGeneratorBgHide})`,
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
          <div>
            {windowSize.width < 770
              ? ChatBoxCompo(chatBoxBgStyle)
              : ChatBoxCompo()}
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(LKR{RecipeGeneratorBg})`,
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
  let RecipeNumber = "RN22546";
  return (
    <div
      className="grid h-screen !w-full grid-rows-6 px-1 md:pl-12 md:pr-28"
      style={chatBoxBgStyle}
    >
      <div className="row-span-5 h-full py-10">
        <ChatBox />
      </div>
      <div className="row-span-1 !m-0 flex h-fit w-full justify-center">
        <div className="flex w-full flex-col content-center justify-center gap-2">
          <h1 className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-center text-sm !font-thin text-transparent md:text-base">
            Recipe generate number : {RecipeNumber}
          </h1>
          <div className="flex justify-center">
            <Button className="m-0 !mb-2 !mt-1 min-w-[200px] !rounded-[10px] border-none !bg-opacity-20 !bg-gradient-to-t from-[#ff922424] to-[#ffe35321] !px-2 !py-5 text-xs font-thin text-black hover:text-black md:!px-16 md:py-5 md:text-sm">
              <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
                Order recipe
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
