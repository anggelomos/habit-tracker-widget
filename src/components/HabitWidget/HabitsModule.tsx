import "./HabitWidget.css";
import {
  AppleIcon,
  AppleIconFilled,
  BookIcon,
  BookIconFilled,
  DumbbellIcon,
  DumbbellIconFilled,
  PenIcon,
  PenIconFilled,
  ShowerIcon,
  ShowerIconFilled,
  SunIcon,
  SunIconFilled,
  YinYangIcon,
  YinYangIconFilled,
} from "./icons";
import { useApp } from "../../context/AppContext";
import { saveHabits } from "../../api";
import { CheckinStatus } from "../../models";
import type { HabitCheckin } from "../../models";

const habits = [
  { id: "sunlight", icon: SunIcon, iconFilled: SunIconFilled, label: "Sunlight" },
  { id: "exercise", icon: DumbbellIcon, iconFilled: DumbbellIconFilled, label: "Strength training" },
  { id: "meditate", icon: YinYangIcon, iconFilled: YinYangIconFilled, label: "Balance practice" },
  { id: "journaling", icon: PenIcon, iconFilled: PenIconFilled, label: "Journaling" },
  { id: "shower", icon: ShowerIcon, iconFilled: ShowerIconFilled, label: "Shower" },
  { id: "eatHealthy", icon: AppleIcon, iconFilled: AppleIconFilled, label: "Eat fruit" },
  { id: "read", icon: BookIcon, iconFilled: BookIconFilled, label: "Read" },
];

export function HabitsModule() {
  const { currentHabits, updateCurrentHabits } = useApp();

  const handleHabitClick = async (habitId: string) => {
    if (!currentHabits) return;

    const existingCheckinIndex = currentHabits.habitCheckins.findIndex(
      (checkin) => checkin.id === habitId
    );

    let updatedCheckins: HabitCheckin[];

    if (existingCheckinIndex !== -1) {
      // Checkin exists, toggle status and update timestamp
      const existingCheckin = currentHabits.habitCheckins[existingCheckinIndex];
      const newStatus =
        existingCheckin.status === CheckinStatus.Completed
          ? CheckinStatus.Skipped
          : CheckinStatus.Completed;

      updatedCheckins = [...currentHabits.habitCheckins];
      updatedCheckins[existingCheckinIndex] = {
        ...existingCheckin,
        timestamp: new Date(),
        status: newStatus,
      };
    } else {
      // Checkin doesn't exist, create new one with completed status
      const newCheckin: HabitCheckin = {
        id: habitId,
        timestamp: new Date(),
        status: CheckinStatus.Completed,
      };
      updatedCheckins = [...currentHabits.habitCheckins, newCheckin];
    }

    const updatedHabits = {
      ...currentHabits,
      habitCheckins: updatedCheckins,
    };

    // Update local state
    updateCurrentHabits(updatedHabits);

    // Send to API
    try {
      await saveHabits(updatedHabits);
    } catch (error) {
      console.error("Failed to save habits:", error);
    }
  };

  const getHabitStatus = (habitId: string): CheckinStatus | null => {
    if (!currentHabits) return null;
    const checkin = currentHabits.habitCheckins.find(
      (checkin) => checkin.id === habitId
    );
    return checkin ? checkin.status : null;
  };

  return (
    <section className="habits-module" aria-label="Habit shortcuts">
      <div className="habits-module__grid">
        {habits.map(({ id, icon: Icon, iconFilled: IconFilled, label }) => {
          const status = getHabitStatus(id);
          const isCompleted = status === CheckinStatus.Completed;
          const IconComponent = isCompleted ? IconFilled : Icon;

          return (
            <span
              key={id}
              className="habits-module__icon"
              aria-label={label}
              onClick={() => handleHabitClick(id)}
              style={{ cursor: "pointer" }}
            >
              <IconComponent size={38} />
            </span>
          );
        })}
        <span
          aria-hidden
          className="habits-module__icon habits-module__icon--spacer"
        >
          &nbsp;
        </span>
      </div>
    </section>
  );
}
