import Back_01 from "../../assets/images/HomePage/Back_01.svg";
import Back_02 from "../../assets/images/HomePage/Back_02.svg";
import Back_03 from "../../assets/images/HomePage/Back_03.svg";
import BestMenu from "../../assets/images/HomePage/BestMenu.svg";
import Back_05 from "../../assets/images/HomePage/CutomerReviews.svg";
import Back_06 from "../../assets/images/HomePage/Blog.svg";
import Back_07 from "../../assets/images/HomePage/AboutUs.svg";
import Back_08 from "../../assets/images/HomePage/MobileApp.svg";
import Text_01 from "../../assets/images/HomePage/Text_01.png";
import Text_02 from "../../assets/images/HomePage/Text_02.png";
import Text_03 from "../../assets/images/HomePage/Text_03.png";
import Text_04 from "../../assets/images/HomePage/Text_04.png";
import Text_05 from "../../assets/images/HomePage/Text_05.png";
import Text_08 from "../../assets/images/HomePage/Text_08.png";
import OurMenu from "../../assets/images/HomePage/OurMenu.png";
import { Button } from "../../base-components/Button";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import DeliveryCards from "../../components/HomePageOrderDiv";
import Delivery_01 from "../../assets/images/HomePage/Delivery_01.png";
import Delivery_02 from "../../assets/images/HomePage/Delivery_02.png";
import Delivery_03 from "../../assets/images/HomePage/Delivery_03.png";
import ProductBrowsingComponent from './../../components/MenuItems/index';
import Shawarma from "../../assets/images/HomePage/Shawarma.png";
import OurSpecial from "../../assets/images/HomePage/OurSpecial.png";
import Burger from "../../assets/images/HomePage/Burger.png";
import OurFood from "../../assets/images/HomePage/OurFood.png";
import ImageGallery from './../../components/ImageGallery/index';
import ReviewCardComponent from './../../components/ReviewCardComponent/index';
import Review_01 from "../../assets/images/HomePage/Pexels Photo by Andrea Piacquadio.png";
import Review_02 from "../../assets/images/HomePage/Pexels Photo by Engin Akyurt.png";
import Review_03 from "../../assets/images/HomePage/Pexels Photo by Pixabay.png";
import rate from "../../assets/images/HomePage/stars.png";
import about from "../../assets/images/HomePage/about.png";
import app_store from "../../assets/images/HomePage/app_store.png";
import google_pay from "../../assets/images/HomePage/google_pay.png";
import get_started from "../../assets/images/HomePage/get_started.png";
import FormInput from './../../base-components/FormElements/FormInput/index';


const products = [
  { name: 'our special',
    image: OurSpecial, 
    content: 'Rice, spices, and Chicken, lamb, beef, or sweet chicken dish, Cardamom, see foods and Special dish',
    price: 'rs  2200.00',
  },
  { name: 'burger submarine ',
  image: Burger ,
  content: 'Crispy chicken, two types of  cheeses, Tomato, potato, Ham, flavor submarine bun and Lettuce ',
  price: 'rs  1200.00',
  },
  { name: 'Shawarma',
  image: Shawarma,
  content: 'Shawarma Roti, chicken, beef, muton, vegetables , customizing flavors with French fries    ',
  price: 'rs  2300.00',
  },
  { name: 'our special' ,
  image: OurSpecial,
  content: 'Rice, spices, and Chicken, lamb, beef, or sweet chicken dish, Cardamom, see foods and Special dish',
  price: 'rs  2200.00',
  },
  // Add more products as needed
];

const reviews = [
  {
    name: 'Ishan Tharindu',
    rate: rate ,
    review: 'The food at this restaurant is absolutely incredible! Everything we tried was bursting with flavor and cooked to perfection. We especially loved the [Taco special], which was a unique and delightful combination of flavors. Well definitely be coming back for more!',
    image: Review_02,
  },
  {
    name: 'Chamod Dilpa',
    rate: rate ,
    review: 'I had an amazing experience at this restaurant! The food was delicious and beautifully presented, the staff was friendly and attentive, and the atmosphere was cozy and inviting. I highly recommend this place to anyone looking for a great meal and a wonderful dining experience.',
    image: Review_03,
  },
  {
    name: 'Shashitha Akalanka',
    rate: rate ,
    review: 'I cant say enough good things about this restaurant! The service was impeccable from start to finish, and the food was out of this world. I was blown away by the creativity and attention to detail in every dish. This is definitely one of my new favorite restaurants!',
    image: Review_03,
  },
  {
    name: 'Chathura Dinushka',
    rate: rate ,
    review: 'The food at this restaurant is absolutely incredible! Everything we tried was bursting with flavor and cooked to perfection. We especially loved the [Taco special], which was a unique and delightful combination of flavors. Well definitely be coming back for more!',
    image: Review_01,
  },
];





const Main = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${Back_01})`,
          backgroundSize: "cover",
        }}
        className="w-m flex h-screen flex-col p-5 pt-[80px] text-center  text-slate-900 dark:text-slate-50 sm:h-screen md:h-screen"
      >

       

        <div className="grid h-screen items-center p-5 md:grid-cols-3 ">
          <div className="flex flex-col items-center justify-center">
            <img src={Text_03} alt="" />
            <br></br>
            <img src={Text_04} alt="" />
            <br></br>
            <img src={Text_05} alt="" />
            <br></br>
            <br></br>
            <div className="flex flex-col sm:grid-cols-2 sm:flex-row">
              <div>
                <Button
                  as={NavLink}
                  to="/"
                  className={twMerge(
                    "rounded-[15px] border-2 border-solid border-amber-500 !bg-transparent px-[30px] py-[20px] lg:px-[45px] lg:py-[10.141px]"
                  )}
                >
                  <span
                    className={twMerge(
                      "text-[14px] font-[900] uppercase tracking-[2px] !text-amber-500 hover:scale-110"
                    )}
                  >
                    Book A Table
                  </span>
                </Button>
              </div>
              &nbsp;&nbsp;
              <div>
                <Button
                  as={NavLink}
                  to="/"
                  className={twMerge(
                    "rounded-[15px] border-2 border-solid border-gradient-yellow-300 !bg-amber-500 px-[20px] py-[20px] lg:px-[50px] lg:py-[10.141px]"
                  )}
                >
                  <span
                    className={twMerge(
                      "!text-#FFE353 text-[14px] font-[900] uppercase tracking-[2px] hover:scale-110"
                    )}
                  >
                    See Menu
                  </span>
                </Button>
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
{/**Second Part */}
      <div
        style={{
          backgroundImage: `url(${Back_02})`,
          backgroundSize: "cover",
        }}
        className="w-m flex h-full flex-col p-5 pt-[80px] text-center  text-slate-900 dark:text-slate-50 sm:h-screen md:h-screen bg-repeat"
      >
        <div className="flex flex-col items-center justify-center">
          <img src={Text_01} alt="" />
          <br></br>
          <img className="jsutify-center" src={Text_02} alt="" />
          <br></br>
          <div className="grid  md:grid-cols-3 w-screen ">

            <div className="flex items-center justify-center">
              <DeliveryCards
                imageSrc={Delivery_01}
                title="Best Quality"
                description="We believe that ordering delicious food should be easy and hassle-free. We understand that our customers have busy schedules, and we want to make the ordering  "
                buttonText="Read More"
              
              />
            </div>
            <div className="flex items-center justify-center">
            <DeliveryCards
                imageSrc={Delivery_02}
                title="Easy to order"
                description="We take pride in delivering our customers' orders quickly and efficiently. We understand that our customers' time is valuable, and we want to ensure that they receive  "
                buttonText="Read More"
              
              />
            </div>
            <div className="flex items-center justify-center">
            <DeliveryCards
                imageSrc={Delivery_03}
                title="Fast Delivery"
                description="We take great pride in delivering the best quality products to our customers. We believe that using high-quality ingredients is the foundation of creating delicious and satisfying  "
                buttonText="Read More"
              
              />
            </div>
            </div>
            
        </div>
      </div>

      {/**Third part */}
      <div
        style={{
          backgroundImage: `url(${Back_03})`,
          backgroundSize: "cover",
        }}
        className="w-m flex h-full flex-col p-5 pt-[80px] text-center  text-slate-900 dark:text-slate-50 sm:h-screen md:h-screen bg-repeat"
      >
          <div className="flex flex-col items-center justify-center">
          <img src={OurMenu} alt="" /><br></br>
          <ProductBrowsingComponent products={products} />
        
          </div>

      </div>
      {/** Third part */}

      <div
        style={{
          backgroundImage: `url(${BestMenu})`,
          backgroundSize: "cover",
        }}
        className="w-m flex h-full flex-col p-5 pt-[80px] text-center  text-slate-900 dark:text-slate-50 sm:h-screen md:h-full bg-repeat"
      >
        <div className=" h-full flex flex-col items-center justify-center">
          <img src={OurFood} alt="Our food"/><br></br>
          <ImageGallery/>
          <br></br>

        </div>


      </div>

      {/** Fourth part */}

      <div
        style={{
          backgroundImage: `url(${Back_05})`,
          backgroundSize: "cover",
        }}
        className="w-m flex h-full flex-col p-5 pt-[80px] text-center  text-slate-900 dark:text-slate-50 sm:h-screen md:h-screen bg-repeat"
      >
        <div className=" h-full flex flex-col items-center justify-center">
          <img src={Text_08} alt="Our food"/><br></br><br></br>
          <ReviewCardComponent reviews={reviews} />
          <br></br>

        </div>


      </div>

      {/** Fifth part */}

      <div
        style={{
          backgroundImage: `url(${Back_06})`,
          backgroundSize: "cover",
        }}
        className="w-m flex h-full flex-col p-5 pt-[80px] text-center  text-slate-900 dark:text-slate-50 sm:h-full md:h-screen bg-repeat"
      >
        <div className=" h-full items-center justify-center">
        <div className="grid h-screen grid-cols-1 sm:grid-cols-2">
          {/* First Column */}
          <div className="p-4 rounded-3xl bg-amber-300 bg-opacity-50 h-screen md:h-5/6 md:pb-10">
            {/* Text at the top of the card */}
            
            {/* Button at the bottom of the card */}
            <br />
            <h2 className="uppercase text-gray-900 xs:text-[30px] sm:text-[40px] tracking-widest xs:font-black">Grand Cafe Blog</h2>
            <br />

            <p className="text-xs xs:text-lg sm:text-xl text-justify p-5 xs:p-10 text-gray-900">
              Welcome to the Taco Grag restaurant blog, your ultimate guide to all things related to our restaurant! Here, you'll find a plethora of information about our mouth-watering food, talented chefs, exceptional customer service, and the overall quality of our restaurant. Whether you're a regular customer or a first-time visitor, our blog is the perfect place to discover everything you need to know about Taco Grag. From our menu to our reservation system, we've got you covered. So, sit back, relax, and let us take you on a journey through the world of Taco Grag!
            </p>
          
            <Button
                  as={NavLink}
                  to="/"
                  className={twMerge(
                    "rounded-[15px] border-2 border-solid border-gradient-yellow-300 !bg-zinc-800 bg-opacity-50 px-[20px] py-[20px] xs:px-[120px]  sm:px-[180px] sm:py-[20px]"
                  )}
                >
                  <span
                    className={twMerge(
                      "!text-#FFE353 text-[14px] font-[900] uppercase tracking-[2px] hover:scale-110"
                    )}
                  >
                    Go to Our Blog
                  </span>
                </Button>
          </div>
          
          {/* Second Column */}
          <div className="p-4">
        {/* Content of the second column */}
      </div>
    </div>
         
          
         

        </div>
        <br></br>


      </div>

      {/**sixth part */}
      <div
        style={{
          backgroundImage: `url(${Back_07})`,
          backgroundSize: "cover",
        }}
        className="w-m flex h-full flex-col p-5 pt-[80px] text-center  text-slate-900 dark:text-slate-50 sm:h-full md:h-screen bg-repeat"
      >
        <div className=" h-1/5 flex flex-col items-center justify-center">
        <img src={about} alt="" /><br/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div>

          </div>
          <div>
         <p className="p-5 text-[px] text-justify tracking-tight text-amber-400 xs:leading-7">     Welcome to our website for the Grand café restaurant, located in One Galle Face, Colombo! We are a food restaurant that is open from 6.00 pm to 1.00 am, and we take pride in offering our customers a unique and unforgettable dining experience.

                 <br/><br/><span>At Grand café, we are passionate about delivering the finest food and customer service in the industry. Our menu is carefully crafted to cater to all tastes, and we use only the freshest and highest-quality ingredients in our dishes. From delicious appetizers to mouth-watering entrees and decadent desserts, we have something to satisfy every craving.</span>

                 <br/><br/> If you're looking to dine with us, you can easily book a table through our website. We also offer takeaway options for those who prefer to enjoy our food from the comfort of their own homes.</p> 
          
            
                  <Button
                  as={NavLink}
                  to="/"
                  className={twMerge(
                    "rounded-[15px] border-2 border-solid border-gradient-yellow-500 !bg-transparent bg-opacity-50 px-[20px] py-[20px]   sm:px-[80px] sm:py-[20px]"
                  )}
                >
                  <span
                    className={twMerge(
                      "!text-#FFE353 text-[14px] font-[900] uppercase tracking-[2px] hover:scale-110"
                    )}
                  >
                    Read More
                  </span>
                </Button>
          </div>


        </div>
      </div>

      {/**sixth part */}
      <div
        style={{
          backgroundImage: `url(${Back_08})`,
          backgroundSize: "cover",
        }}
        className="w-m flex h-full flex-col p-5 pt-[80px] text-center  text-slate-900 dark:text-slate-50 sm:h-full md:h-screen bg-repeat"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 ">
          <div className="flex flex-col items-center justify-center">
            <img src={get_started} alt="" className="w-3/4"/><br/> 
            <p className="p-5 xs:p-10   text-center tracking-wide text-amber-400 sm:leading-10">
            Welcome to our mobile app for Taco Grag restaurant !   Our mobile app is the perfect way to stay connected with us and enjoy all of our services on the go. With our app, you can easily browse our menu, place orders for pickup or delivery, and even make reservations at our restaurant.
            </p>
            <Button
                  as={NavLink}
                  to="/"
                  className={twMerge(
                    "rounded-[15px] border-2 border-solid hover:text-amber-300  border-gradient-yellow-500 !bg-gradient-yellow bg-opacity-50 px-[20px] py-[20px]   sm:px-[80px] sm:py-[20px]"
                  )}
                >
                  <span
                    className={twMerge(
                      "!text-#FFE353 text-[14px] font-[900] uppercase tracking-[2px]  "
                    )}
                  >
                    Download App
                  </span>
                </Button>
                <br/>
                <div className="flex grid-cols-2 sm:mt-10">
                      <div className="mx-4"> <img src={app_store} alt=""/></div>
                      <div className="mx-4"> <img src={google_pay} alt=""/></div>
                </div>
          </div>
          <div></div>

        </div>

      </div>


      
    </div>
  );
};

export default Main;
