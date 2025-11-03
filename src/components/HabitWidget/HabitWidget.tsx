import "./HabitWidget.css";
import { BrushModule } from "./BrushModule";
import { DateModule } from "./DateModule";
import { HabitsModule } from "./HabitsModule";
import { NavigationButton } from "./NavigationButton";
import { SetTasksModule } from "./SetTasksModule";
import { StatsModule } from "./StatsModule";
import { WaterCupsModule } from "./WaterCupsModule";
import { useApp } from "../../context/AppContext";

export function HabitWidget() {
  const { isLoading } = useApp();

  return (
    <main className="habit-widget" aria-label="Daily habit tracker">
      
      {isLoading && (
        <div className="habit-widget__loading-overlay">
          <span className="habit-widget__loading-spinner"></span>
        </div>
      )}

      <section className="habit-widget__date">
        <DateModule />
        <NavigationButton direction="previous" />
      </section>

      <section className="habit-widget__brush">
        <BrushModule />
        <SetTasksModule />
      </section>

      <section className="habit-widget__water">
        <WaterCupsModule />
        <StatsModule />
      </section>

      <section className="habit-widget__habits">
        <HabitsModule />
        <NavigationButton direction="next" />
      </section>

    </main>
  );
}
