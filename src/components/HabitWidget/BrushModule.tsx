import "./HabitWidget.css";
import { BrushIcon } from "./icons";

const brushSlots = Array.from(
  { length: 4 },
  (_, index) => `Brush ${index + 1}`
);

export function BrushModule() {
  return (
    <section className="brush-module" aria-label="Brush reminders">
      <div className="brush-module__grid">
        {brushSlots.map((label) => (
          <span key={label} className="brush-module__slot" aria-hidden="true">
            {/* <img src="/brush_empty.svg" alt="" width={36} height={36} /> */}
            <BrushIcon size={1} />
          </span>
        ))}
      </div>
    </section>
  );
}
