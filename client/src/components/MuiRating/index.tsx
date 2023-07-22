import { Rating, Stack } from "@mui/material";
import { useState } from "react";

interface MuiRatingProps {
  rateValue?: number;
}

const MuiRating = (props: MuiRatingProps) => {
  const [value, setValue] = useState<number | null>(
    props.rateValue ? props.rateValue : null
  );

  console.log(value);

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setValue(newValue);
  };

  return (
    <div className="flex">
      <div>
        <Stack spacing={2}>
          <Rating
            value={value}
            onChange={handleChange}
            precision={0.5}
            style={{ color: "#24FFFF" }}
          />
        </Stack>
      </div>
      <div className="my-auto">
        <p className="ml-2 !bg-gradient-to-r from-gradient-green-300 to-gradient-blue-500 bg-clip-text text-xs font-normal text-transparent md:text-sm">
          {value}
        </p>
      </div>
    </div>
  );
};

export default MuiRating;
