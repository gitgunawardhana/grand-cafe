import { twMerge } from "tailwind-merge";

type FormLabelProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<"label">;

function FormLabel(props: FormLabelProps) {
  const { className, children, id } = props;

  return (
    <label
      {...props}
      htmlFor={id}
      className={twMerge(["mb-2 inline-block", className])}
    >
      {children}
    </label>
  );
}

export default FormLabel;
