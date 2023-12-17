import Back_07 from "../../assets/images/HomePage/AboutUs.svg";
import about from "../../assets/images/HomePage/about.png";

const Main = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${Back_07})`,
        backgroundSize: "cover",
      }}
      className="w-m flex h-full flex-col bg-repeat p-5 pt-[80px]  text-center text-slate-900 dark:text-slate-50 sm:h-full md:h-screen"
    >
      <div className="mt-32 flex h-1/5 flex-col items-center justify-center">
        <img src={about} alt="" />
        <br />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        <div></div>
        <div className="col-span-2 h-screen bg-black px-32 py-20">
          <p className="text-justify tracking-tight text-[px] text-amber-400 xs:leading-7">
            Welcome to our website for the Grand café restaurant, located in One
            Galle Face, Colombo! We are a food restaurant that is open from 6.00
            pm to 1.00 am, and we take pride in offering our customers a unique
            and unforgettable dining experience.
            <br />
            <br />
            <span>
              At Grand café, we are passionate about delivering the finest food
              and customer service in the industry. Our menu is carefully
              crafted to cater to all tastes, and we use only the freshest and
              highest-quality ingredients in our dishes. From delicious
              appetizers to mouth-watering entrees and decadent desserts, we
              have something to satisfy every craving.
            </span>
            <br />
            <br /> If you're looking to dine with us, you can easily book a
            table through our website. We also offer takeaway options for those
            who prefer to enjoy our food from the comfort of their own homes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
