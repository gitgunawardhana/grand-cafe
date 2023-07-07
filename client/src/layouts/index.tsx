import { twMerge } from "tailwind-merge";

interface LayoutsProps {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
}

const Main = (props: LayoutsProps) => {
  return (
    <div
      className={twMerge([
        "mx-auto !min-h-screen px-0 lg:px-0",
        props.className,
      ])}
    >
      {props.children}
    </div>
  );
};

export default Main;
