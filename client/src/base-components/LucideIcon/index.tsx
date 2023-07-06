import clsx from "clsx";
import * as lucideIcons from "lucide-react";
import { Icon } from "lucide-react"; // Import the Icon component separately

export const { ...icons } = lucideIcons;

type IconName = keyof typeof icons;

interface LucideProps extends React.ComponentPropsWithoutRef<"svg"> {
  icon: IconName;
  size?: number;
  strokeWidth?: number;
}

const Lucide: React.FC<LucideProps> = ({ icon, className, ...rest }) => {
  const LucideIcon = icons[icon] as Icon; // Cast the icon component as Icon type

  return <LucideIcon {...rest} className={clsx(["stroke-1.5", className])} />;
};

export default Lucide;
