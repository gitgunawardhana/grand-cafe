import { Icons } from "../../../constants";
import LucideIcon from "../../LucideIcon";

function FormRequiredIcon() {
  return (
    <LucideIcon
      icon={Icons.ASTERISK}
      width={15}
      height={15}
      className="text-danger"
    />
  );
}

function FormRequiredLabel() {
  return (
    <div className="dark:bg-darkmode-300 rounded-md bg-slate-200 px-2 py-0.5 text-xs text-slate-600 dark:text-slate-400">
      Required
    </div>
  );
}

export { FormRequiredIcon, FormRequiredLabel };
