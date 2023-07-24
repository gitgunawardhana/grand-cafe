import React from "react";

interface Review {
  name: string;
  review: string;
  image: string;
}

interface ReviewCardProps {
  review: Review;
}

const Card: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="rounded-md p-4 bg-white">
      <div className="justify-center items-center flex">
        {review.image && <img src={review.image} alt={review.name} className="h-auto w-3/5" />}
      </div>
      <br />
      <p className="text-amber-500 uppercase font-black tracking-widest text-2xl">{review.name}</p>
      <br />
      <p className="text-amber-100 tracking-widest">{review.review}</p>
    </div>
  );
};

export default Card;
