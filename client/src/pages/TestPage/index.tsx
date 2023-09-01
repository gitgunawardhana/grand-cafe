import React, { useState, useEffect, useRef } from "react";
import ProductDetailsPage from "../../pages/ProductDetails"; 
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";

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
              className={`w-full lg:w-1/3 flex-none transform transition-transform ${
                index === currentPage ? "scale-100" : "scale-90"
              }`}
            >
              {/* Render your product component or content here */}
              <div className="rounded-md p-4 justify-center items-center grid">
                <div className="justify-center items-center flex">
                  <img
                   src={`data:image/jpeg;base64,${product.image}`}
                    alt={product.name}
                    className="h-auto w-3/5"
                  />
                </div>
                <br></br>
                <p className="text-amber-500 uppercase font-black tracking-widest text-2xl">{product.name}</p><br></br>
                <p className="text-amber-900 tracking-widest">{product.description}</p><br></br>
                <p className="text-amber-500 uppercase text-2xl -tracking-normal font-black">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Scroll right button */}
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
      
      {/* Pagination dots */}
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

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/products/product");
      const json = await res.json();
      setProducts(json.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white">
      {/* <Router>
        <Routes >
          <Route path="/"> */}
            <ProductBrowsingComponent products={products} />
          {/* </Route>
          <Route path="/product/:productName">
            <ProductDetailsPage products={products} />
          </Route>
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
