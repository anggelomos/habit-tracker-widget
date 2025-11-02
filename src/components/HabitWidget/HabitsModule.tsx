import "./HabitWidget.css";
import {
  AppleIcon,
  BookIcon,
  DumbbellIcon,
  PenIcon,
  ShowerIcon,
  SunIcon,
  YinYangIcon,
} from "./icons";

const habits = [
  { id: "sunlight", icon: SunIcon, label: "Sunlight" },
  { id: "strength", icon: DumbbellIcon, label: "Strength training" },
  { id: "balance", icon: YinYangIcon, label: "Balance practice" },
  { id: "journaling", icon: PenIcon, label: "Journaling" },
  { id: "shower", icon: ShowerIcon, label: "Shower" },
  { id: "fruit", icon: AppleIcon, label: "Eat fruit" },
  { id: "reading", icon: BookIcon, label: "Read" },
];

export function HabitsModule() {
  return (
    <section className="habits-module" aria-label="Habit shortcuts">
      <div className="habits-module__grid">
        {habits.map(({ id, icon: Icon, label }) => (
          <span key={id} className="habits-module__icon" aria-label={label}>
            <Icon size={38} />
          </span>
        ))}
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

