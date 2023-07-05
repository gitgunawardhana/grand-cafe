import clsx from "clsx";
import * as lucideIcons from "lucide-react";

export const { ...icons } = lucideIcons;

type icon = keyof typeof icons;

export interface LucideProps extends React.ComponentPropsWithoutRef<"svg"> {
  icon: icon;
  title?: string;
}

function Lucide(props: LucideProps) {
  const { icon, className, ...computedProps } = props;
  const Component = lucideIcons[props.icon];
  return (
    <Component
      {...computedProps}
      className={clsx(["stroke-1.5", props.className])}
    />
  );
}

export default Lucide;
