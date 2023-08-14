import Grid1 from "../../assets/images/HomePage/Grid (1).png";
import Grid2 from "../../assets/images/HomePage/Grid (2).png";
import Grid3 from "../../assets/images/HomePage/Grid (3).png";
import Grid4 from "../../assets/images/HomePage/Grid (4).png";
import Grid5 from "../../assets/images/HomePage/Grid (5).png";
import Grid6 from "../../assets/images/HomePage/Grid (6).png";

const index = () => {
  return (
    <div>
      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
        <div className="h-full flex flex-wrap md:-m-2">
          <div className=" h-full flex w-1/2 flex-wrap">
            <div className="w-1/2 p-1 md:p-2 image-container">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center image"
                src={Grid1}
              />
            </div>
            <div className="w-1/2 p-1 md:p-2 image-container">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center image"
                src={Grid2}
              />
            </div>
            <div className="w-full p-1 md:p-2 image-container">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center image"
                src={Grid3}
              />
            </div>
          </div>
          <div className="flex w-1/2 flex-wrap">
            <div className="w-full p-1 md:p-2 image-container">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center image"
                src={Grid4}
              />
            </div>
            <div className="w-1/2 p-1 md:p-2 image-container">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center image"
                src={Grid5}
              />
            </div>
            <div className="w-1/2 p-1 md:p-2 image-container">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center image"
                src={Grid6}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
