// BirthdayPicker.tsx
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function BirthdayPicker({ birthday, setBirthday }: {
  birthday: Date | undefined;
  setBirthday: (date: Date | undefined) => void;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor="birthday" className="block font-medium">Birthday</label>
      
      <DayPicker
        mode="single"
        selected={birthday}
        onSelect={setBirthday}
        captionLayout="dropdown"
        fromYear={1900}
        toYear={new Date().getFullYear()}
        weekStartsOn={0} // Sunday
      />

      {birthday && (
        <p className="text-sm text-muted-foreground">
          Selected: {format(birthday, "PPP")}
        </p>
      )}
    </div>
  );
}
