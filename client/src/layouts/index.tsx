interface LayoutsProps {
  children: React.ReactElement | React.ReactElement[];
}

const Main = (props: LayoutsProps) => {
  return <div className="mx-auto px-0 lg:px-0">{props.children}</div>;
};

export default Main;
