import React, { useRef, useState } from "react";

interface Product {
  name: string;
  image: string;
  content: string;
  price: string;
}

interface ProductBrowsingComponentProps {
  products: Product[];
}

const ProductBrowsingComponent: React.FC<ProductBrowsingComponentProps> = ({
  products,
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const scrollLeft = () => {
    if (viewerRef.current) {
      viewerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
      setCurrentPage(currentPage - 1);
    }
  };

  const scrollRight = () => {
    if (viewerRef.current) {
      viewerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <button
          className={` rounded-l p-5 focus:outline-none ${
            currentPage === 0 ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={scrollLeft}
          disabled={currentPage === 0}
        >
          &lt;
        </button>
        <div className="flex space-x-4 overflow-hidden" ref={viewerRef}>
          {products.map((product: Product, index: number) => (
            <div
              key={index}
              className={`w-4/5 md:w-1/3 flex-none transform transition-transform ${
                index === currentPage ? "scale-100" : "scale-90"
              }`}
            >
              {/* Render your product component or content here */}
              <div className="rounded-md p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-auto w-full"
                /><br></br>

                <p className="text-amber-500 uppercase font-black tracking-widest text-2xl">{product.name}</p><br></br>
                <p className="text-amber-100 tracking-widest">{product.content}</p><br></br>
                <p className="text-amber-500 uppercase text-2xl -tracking-normal font-black">{product.price}</p>
                
              </div>
            </div>
          ))}
        </div>
        <button
          className={` rounded-r p-5 focus:outline-none ${
            currentPage === products.length - 1
              ? "cursor-not-allowed opacity-50"
              : ""
          }`}
          onClick={scrollRight}
          disabled={currentPage === products.length - 1}
        >
          &gt;
        </button>
      </div>
      <br></br>
      <div className="grid items-center justify-center">
        <div className="mt-2 flex space-x-2">
          {products.map((_, index) => (
            <>
              <br></br>
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

export default ProductBrowsingComponent;
