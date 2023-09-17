import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";
import ChefBotText from "../../assets/images/ChefBotText.svg";
import RecipeGeneratorBg from "../../assets/images/RecipeGeneratorBg.svg";
import RecipeGeneratorBgHide from "../../assets/images/RecipeGeneratorBgHide.svg";
import { Button } from "../../base-components/Button";
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
          <div>
            {windowSize.width < 770
              ? ChatBoxCompo(chatBoxBgStyle)
              : ChatBoxCompo()}
          </div>
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
  const [recipe, setRecipe] = useState<any>("");
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);
  const keywordsToCheck = ["Ingredients:", "Instructions:", "Here's"];

  useEffect(() => {
    if (sessionStorage.getItem("seatBookingId")) {
      if (keywordsToCheck.some((keyword) => recipe.includes(keyword))) {
        setButtonDisable(true);
      } else {
        setButtonDisable(false);
      }
    } else {
      setButtonDisable(false);
    }
    console.log(buttonDisable);
  }, [recipe]);

  const { axiosJWT } = useContext(ProviderContext);
  const navigate = useNavigate();
  const placeOrder = async () => {
    try {
      const res = await axiosJWT.post(
        "user/create-recipe",
        {
          seatBookingId: sessionStorage.getItem("seatBookingId"),
          recipe: recipe,
        },
        {
          headers: {
            authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      );

      Swal.fire({
        position: "center",
        icon: "success",
        text: "Your recipe has been successfully sent. We look forward to serving you.",
        background: "#2A200A",
        color: "#F19328",
        showConfirmButton: false,
        timer: 1000,
      });

      sessionStorage.removeItem("seatBookingId");
      navigate("/table-booking");
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Sorry, we couldn't send your recipe at this time. Please try again or contact us for assistance.",
        background: "#2A200A",
        color: "#F19328",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };
  return (
    <div
      className="grid h-screen !w-full grid-rows-6 px-1 md:pl-12 md:pr-28"
      style={chatBoxBgStyle}
    >
      <div className="row-span-5 h-full py-10">
        <ChatBox setRecipe={setRecipe} />
      </div>
      <div className="row-span-1 !m-0 flex h-fit w-full justify-center">
        <div className="flex w-full flex-col content-center justify-center gap-2">
          <h1 className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-center text-sm !font-thin text-transparent md:text-base">
            Recipe generate number : {sessionStorage.getItem("seatBookingId")}
          </h1>
          <div className="flex justify-center">
            <Button
              className={twMerge([
                "m-0 !mb-2 !mt-1 min-w-[200px] !rounded-[10px] border-none !bg-opacity-20 !bg-gradient-to-t from-[#ff922424] to-[#ffe35321] !px-2 !py-5 text-xs font-thin text-black hover:text-black md:!px-16 md:py-5 md:text-sm",
                !buttonDisable && "cursor-not-allowed opacity-30",
              ])}
              onClick={placeOrder}
              disabled={!buttonDisable}
            >
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
