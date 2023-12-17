import Back_05 from "../../assets/images/HomePage/CutomerReviews.svg";
import Review_03 from "../../assets/images/HomePage/Pexels Photo by Pixabay.png";
import rate from "../../assets/images/HomePage/stars.png";
import Text_08 from "../../assets/images/HomePage/Text_08.png";
import ReviewCardComponent from "./../../components/ReviewCardComponent/index";

const reviews = [
  {
    name: "Ishan Tharindu",
    rate: rate,
    review:
      "The food at this restaurant is absolutely incredible! Everything we tried was bursting with flavor and cooked to perfection. We especially loved the [Taco special], which was a unique and delightful combination of flavors. Well definitely be coming back for more!",
    image: Review_03,
  },
  {
    name: "Chamod Dilpa",
    rate: rate,
    review:
      "I had an amazing experience at this restaurant! The food was delicious and beautifully presented, the staff was friendly and attentive, and the atmosphere was cozy and inviting. I highly recommend this place to anyone looking for a great meal and a wonderful dining experience.",
    image: Review_03,
  },
  {
    name: "Shashitha Akalanka",
    rate: rate,
    review:
      "I cant say enough good things about this restaurant! The service was impeccable from start to finish, and the food was out of this world. I was blown away by the creativity and attention to detail in every dish. This is definitely one of my new favorite restaurants!",
    image: Review_03,
  },
  {
    name: "Chathura Dinushka",
    rate: rate,
    review:
      "The food at this restaurant is absolutely incredible! Everything we tried was bursting with flavor and cooked to perfection. We especially loved the [Taco special], which was a unique and delightful combination of flavors. Well definitely be coming back for more!",
    image: Review_03,
  },
];

const Reviews = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${Back_05})`,
        backgroundSize: "cover",
      }}
      className="w-m flex h-full flex-col bg-repeat p-5 pt-[80px]  text-center text-slate-900 dark:text-slate-50 sm:h-screen md:h-screen"
    >
      <div className=" flex h-full flex-col items-center justify-center pt-20">
        <img src={Text_08} alt="Our food" />
        <br></br>
        <br></br>
        <ReviewCardComponent reviews={reviews} />
        <br></br>
      </div>
    </div>
  );
};

export default Reviews;
