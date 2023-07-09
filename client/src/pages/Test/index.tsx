import InputField from "../../base-components/FormElements/InputElement";
import Footer from "../../components/Footer";
import { AlignmentTypes } from "../../constants";

const Main = () => {
  const h = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <div>
      <div>
        <h1 className="mb-2 mt-5 text-[#a8a8a8]">
          How to use Footer---------------------
        </h1>
        <Footer></Footer>
      </div>
      <div>
        <h1 className="mb-2 mt-5 text-[#a8a8a8]">
          How to use Input Field---------------------
        </h1>
        <InputField
          helperText="Help"
          labelAlignment={AlignmentTypes.BLOCK}
          required
          className="!text-gradient-yellow-500 focus:!border-gradient-yellow-900 focus:outline-none focus:ring-0 dark:!border-gradient-yellow-500"
          labelClassName="!text-gradient-yellow-900 !bg-white"
          sepLabel="Label"
          label="Floating Label"
          onChange={h}
        />
      </div>
    </div>
  );
};

export default Main;
