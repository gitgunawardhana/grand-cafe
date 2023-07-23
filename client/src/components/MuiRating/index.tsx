import { Rating, Stack } from "@mui/material";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface MuiRatingProps {
  rateValue?: number;
  className?: string;
  textClassName?: string;
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
            className={twMerge([
              "!text-[#24FFFF]",
              props.className && props.className,
            ])}
          />
        </Stack>
      </div>
      <div className="my-auto">
        <p className={twMerge(["ml-2 !bg-gradient-to-r from-gradient-green-300 to-gradient-blue-500 bg-clip-text text-xs font-normal text-transparent md:text-sm",
          props.textClassName && props.textClassName])}>
          {value}
        </p>
      </div>
    </div>
  );
};

export default MuiRating;
