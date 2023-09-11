import { twMerge } from "tailwind-merge";

interface TextAreaProps {
  value?: string;
  cols?: number;
  rows?: number;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  name?: string;
  onBlur?: any;
}

const Main = (props: TextAreaProps) => {
  const { value, cols, rows, className, placeholder, disabled } = props;
  return (
    <>
      <textarea
        className={twMerge([
          "mt-3 resize-none rounded-lg border-gradient-yellow-900 bg-transparent text-gradient-yellow-900 focus:border-gradient-yellow-900 focus:ring-0",
          className && className,
          disabled && "cursor-default",
        ])}
        cols={cols && cols}
        rows={rows && rows}
        placeholder={placeholder && placeholder}
        readOnly={disabled && disabled}
        defaultValue={value && value}
        onChange={props.onChange}
        name={props.name && props.name}
        onBlur={props.onBlur && props.onBlur}
      />
    </>
  );
};

export default Main;
