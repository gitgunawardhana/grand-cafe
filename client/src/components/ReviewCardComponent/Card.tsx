import React from "react";
import Icon_01 from "../../assets/images/HomePage/image 62.png";
import Icon_02 from "../../assets/images/HomePage/image 63.png";
import Icon_03 from "../../assets/images/HomePage/image 64.png";
import Icon_04 from "../../assets/images/HomePage/image 65.png";

interface Review {
  name: string;
  rate:string;
  review: string;
  image: string;
}

interface ReviewCardProps {
  review: Review;
}

const Card: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="rounded-3xl p-4 bg-gradient-to-br from-yellow-950 to-Emerald-950 content-center items-center">
      <div className="justify-center items-center flex">
        {review.image && <img src={review.image} alt={review.name} className="h-auto w-3/5" />}
      </div><br />
      <div className="justify-center items-center flex">
      <img src={review.rate} />
      </div>
      
      <br />
      <p className="text-amber-500 uppercase font-black tracking-widest text-2xl">{review.name}</p>
      <br />

      <p className="text-amber-100 tracking-widest  px-10">{review.review}</p><br />
     
      <div className="flex p-5 justify-evenly items-center w-full">
      <img src={Icon_01} />
      <img src={Icon_02}/>
      <img src={Icon_03} />
      <img src={Icon_04}/>
      </div>
      
    </div>
  );
};

export default Card;
