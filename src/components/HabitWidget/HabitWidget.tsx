import "./HabitWidget.css";
import { ArrowIcon } from "./icons";
import { BrushModule } from "./BrushModule";
import { DateModule } from "./DateModule";
import { HabitsModule } from "./HabitsModule";
import { SetTasksModule } from "./SetTasksModule";
import { StatsModule } from "./StatsModule";
import { WaterCupsModule } from "./WaterCupsModule";

export function HabitWidget() {
  return (
    <main className="habit-widget" aria-label="Daily habit tracker">

      <section className="habit-widget__date">
        <DateModule />
        <span className="habit-widget__nav nav--previous" aria-label="Previous day">
          <ArrowIcon direction="left" />
        </span>
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
        <span className="habit-widget__nav nav--next" aria-label="Next day">
          <ArrowIcon direction="right" size={44} />
        </span>
      </section>

    </main>
  );
}
