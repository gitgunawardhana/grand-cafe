import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import "./DateTimePicker.css";

export default function MuiDateTimePicker({
  variant,
  label,
  date,
  time,
  onDateChange, // Receive the onDateChange prop
  onTimeChange, // Receive the onTimeChange prop
}: {
  variant?: "desktop" | "mobile" | "responsive" | "static";
  label?: string;
  date?: boolean;
  time?: boolean;
  onDateChange?: (date: any) => void; // Define the type for onDateChange function
  onTimeChange?: (time: any) => void; // Define the type for onTimeChange function
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          "DatePicker",
          "MobileDatePicker",
          "DesktopDatePicker",
          "StaticDatePicker",
        ]}
      >
        {variant === "desktop" && (
          <DemoItem label={label && label}>
            {date && (
              <DesktopDatePicker
                defaultValue={dayjs()}
                onChange={onDateChange}
              />
            )}
            {time && (
              <DesktopTimePicker
                defaultValue={dayjs()}
                onChange={onTimeChange}
              />
            )}
          </DemoItem>
        )}
        {variant === "mobile" && (
          <DemoItem label={label && label}>
            {date && (
              <MobileDatePicker
                defaultValue={dayjs()}
                onChange={onDateChange}
              />
            )}
            {time && (
              <MobileTimePicker
                defaultValue={dayjs()}
                onChange={onTimeChange}
              />
            )}
          </DemoItem>
        )}
        {variant === "responsive" && (
          <DemoItem label={label && label}>
            {date && (
              <DatePicker defaultValue={dayjs()} onChange={onDateChange} />
            )}
            {time && (
              <TimePicker defaultValue={dayjs()} onChange={onTimeChange} />
            )}
          </DemoItem>
        )}
        {variant === "static" && (
          <DemoItem label={label && label}>
            {date && (
              <StaticDatePicker
                defaultValue={dayjs()}
                onChange={onDateChange}
              />
            )}
            {time && (
              <StaticTimePicker
                defaultValue={dayjs()}
                onChange={onTimeChange}
              />
            )}
          </DemoItem>
        )}
      </DemoContainer>
    </LocalizationProvider>
  );
}

MuiDateTimePicker.defaultProps = {
  variant: "responsive",
  date: true,
  time: true,
};
