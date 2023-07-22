import Back_01 from "../../assets/images/HomePage/Back_01.svg";
import Back_02 from "../../assets/images/HomePage/Back_02.svg";
import Back_03 from "../../assets/images/HomePage/Back_03.svg";
import Text_01 from "../../assets/images/HomePage/Text_01.png";
import Text_02 from "../../assets/images/HomePage/Text_02.png";
import Text_03 from "../../assets/images/HomePage/Text_03.png";
import Text_04 from "../../assets/images/HomePage/Text_04.png";
import Text_05 from "../../assets/images/HomePage/Text_05.png";
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
import BestMenu from "../../assets/images/HomePage/BestMenu.svg";
import OurFood from "../../assets/images/HomePage/OurFood.png";
import ImageGallery from './../../components/ImageGallery/index';

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
      
    </div>
  );
};

export default Main;
