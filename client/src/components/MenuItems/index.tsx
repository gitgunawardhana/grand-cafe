import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ProviderContext } from "../Provider";

interface Product {
  name: string;
  image: string;
  description: string;
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
      <div className="grid items-center md:flex md:items-center">
        {/* Scroll left button */}
        <button
          className={` rounded-l p-5 focus:outline-none ${
            currentPage === 0 ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={scrollLeft}
          disabled={currentPage === 0}
        >
          &lt;
        </button>

        {/* Product viewer */}
        <div className="flex space-x-4 overflow-hidden" ref={viewerRef}>
          {products.map((product: Product, index: number) => (
            <div
              key={index}
              className={`${
                index === currentPage ? "scale-100" : "scale-90"
              } w-full flex-none transform transition-transform
              lg:w-1/3`}
            >
              {/* Render your product component or content here */}
              <div className="grid items-center justify-center rounded-md p-4">
                <div className="flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-auto w-4/6 rounded-full"
                  />
                </div>
                <br></br>
                <Link to={`/product/${encodeURIComponent(product.name)}`}>
                  <p className="text-2xl font-black uppercase tracking-widest text-amber-500">
                    {product.name}
                  </p>
                  <br></br>
                </Link>

                <p className="tracking-widest text-amber-100">
                  {product.description}
                </p>
                <br></br>
                <p className="text-2xl font-black uppercase -tracking-normal text-amber-500">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll right button */}
        <button
          className={`${
            currentPage === products.length - 1
              ? "cursor-not-allowed opacity-50"
              : ""
          }
              rounded-r p-5
          focus:outline-none`}
          onClick={scrollRight}
          disabled={currentPage === products.length - 1}
        >
          &gt;
        </button>
      </div>

      {/* Pagination dots */}
      <br></br>
      <div className="grid items-center justify-center">
        <div className="mt-2 flex space-x-2">
          {products.map((_, index) => (
            <>
              <br></br>
              <div
                key={index}
                className={`${
                  index === currentPage ? "bg-black" : "bg-gray-900"
                } h-2 w-2
                rounded-full`}
                onClick={() => setCurrentPage(index)}
              ></div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

function App() {
  // const [products, setProducts] = useState<Product[]>([]);

  // const fetchData = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8000/api/products/product");
  //     const json = await res.json();
  //     setProducts(json.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const { products } = useContext(ProviderContext);

  return (
    <div>
      <ProductBrowsingComponent products={products} />
    </div>
  );
}

export default App;
