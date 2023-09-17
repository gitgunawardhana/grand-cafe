import { Rating, Stack } from "@mui/material";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { NavLink } from "react-router-dom";
import { Button } from "../../base-components/Button";
import axios from "axios";
import Swal from "sweetalert2";

interface MuiRatingProps {
  productId: string;
  rateValue?: number;
  className?: string;
  textClassName?: string;
  active?:boolean;
}


const MuiRating = (props: MuiRatingProps) => {
  const [value, setValue] = useState<number | null>(
    props.rateValue ? props.rateValue : null
  );
  const [id, setId] = useState<String | null>(
    props.productId ? props.productId : null
  );
  const [active, setActive] = useState<boolean | false>(
    props.active ? props.active : false
  );

  

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setValue(newValue);
    
  };

  const handleRateClick = async () => {

    const result = await Swal.fire({
      title: `Are you sure Abount this rating?`,
      
      icon: "info",
      showCancelButton: true,
      background: "#A96C07",
      color: "#fff",
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Rate!",
    });
    if(result){
      if (value !== null && value >= 0 && value <= 5) {
        try {
          // Send an HTTP request to update the rate for the product
          await axios.put(`http://localhost:8000/api/products/updateRate/`, {
            _id:id,
            rate: value,
          });
  
          // Optionally, you can update the UI or show a success message to the user
          console.log("Rate updated successfully");
  
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Thank You for your Rating !",
            background: "#A96C07",
            color: "#fff",
            showConfirmButton: false,
            timer: 5000,
          });
        } catch (error) {
          console.error("Error updating rate:", error);
        }
      } else {
        // Handle the case where the rate value is invalid
        console.error("Invalid rate value. Rate must be between 0 and 5.");
      }
    }
    // Check if the rate value is valid (between 0 and 5)
    
  };




  return (
    <div className="flex items-center justify-center">
      <div className="flex">
      <div>
        <Stack spacing={2}>
          <Rating
            value={value}
            onChange={handleChange}
            precision={0.5}
            className={twMerge([
              "!text-[#24FFFF]",
              props.className && props.className,
            ])}
          />
        </Stack>
      </div>
      <div className="my-auto mr-4">
        <p
          className={twMerge([
            "ml-2 !bg-gradient-to-r from-gradient-green-300 to-gradient-blue-500 bg-clip-text text-xs font-normal text-transparent md:text-sm",
            props.textClassName && props.textClassName,
          ])}
        >
          {typeof value === 'number' ? value.toFixed(1) : ''}
        </p>
      </div>
      </div>
      
      { active?( 
      <div>
        <Button
          onClick={handleRateClick}
          as={NavLink}
          className=" !rounded-[10px] border-none !bg-opacity-20 !bg-gradient-to-b from-gradient-yellow-900-6 to-gradient-yellow-900-2 !px-5 !py-2 text-xs font-semibold uppercase text-black hover:text-black md:!px-5 md:py-2 md:text-sm"
        >
          <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
            Rate
          </p>
        </Button>
      </div>
      ):null}
     
    </div>
  );
};

export default MuiRating;
