

interface CardProps {
    imageSrc: string;
    title: string;
    description: string;
    buttonText: string;
  }

const Main: React.FC<CardProps> =({ imageSrc, title, description, buttonText }) => {
  return (
    <div className="  rounded-lg shadow-lg p-4">
      <div className="flex justify-center items-center">
        <img src={imageSrc} alt="Card" className=" " />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-amber-500">{title}</h3>
        <p className="text-white text-md p-5  mb-4">{description}</p><br></br>
        <button className=" rounded-[15px] border-2 border-solid border-amber-500 !bg-transparent px-[30px] py-[20px] lg:px-[45px] lg:py-[10.141px] hover:scale-110 ">
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default Main