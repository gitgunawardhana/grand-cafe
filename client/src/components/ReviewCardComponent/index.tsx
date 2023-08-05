import React, { useRef, useState } from "react";
import ReviewCard from "./Card";

interface Review {
  name: string;
  rate:string;
  review: string;
  image: string;
}

interface ReviewCardComponentProps {
  reviews: Review[];
}

const ReviewCardComponent: React.FC<ReviewCardComponentProps> = ({ reviews }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const scrollLeft = () => {
    if (viewerRef.current) {
      viewerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const scrollRight = () => {
    if (viewerRef.current) {
      viewerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <div className="grid items-center md:flex md:items-center">
        <button
          className={`rounded-l p-5 focus:outline-none ${
            currentPage === 0 ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={scrollLeft}
          disabled={currentPage === 0}
        >
          &lt;
        </button>
        <div className="flex space-x-4 overflow-hidden" ref={viewerRef}>
          {reviews.map((review: Review, index: number) => (
            <div
              key={index}
              className={`w-full lg:w-1/3 flex-none transform transition-transform ${
                index === currentPage ? "scale-100" : "scale-90"
              }`}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
        <button
          className={`rounded-r p-5 focus:outline-none ${
            currentPage === reviews.length - 1 ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={scrollRight}
          disabled={currentPage === reviews.length - 1}
        >
          &gt;
        </button>
      </div>
      <br />
      <div className="grid items-center justify-center">
        <div className="mt-2 flex space-x-2">
          {reviews.map((_, index) => (
            <>
              <br />
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentPage ? "bg-black" : "bg-gray-900"
                }`}
                onClick={() => setCurrentPage(index)}
              ></div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewCardComponent;
