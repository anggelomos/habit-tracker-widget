import "./HabitWidget.css";
import { CupIcon } from "./icons";

const waterSchedule = [
  ["06a", "07a", "08a", "09a", "10a", "11a"],
  ["12a", "01p", "02p", "03p", "04p", "05p"],
];

export function WaterCupsModule() {
  return (
    <section className="water-module__container" aria-label="Water intake schedule">
        {waterSchedule.map((row, rowIndex) => (
          <div key={rowIndex} className="water-module__row">
            {row.map((time) => (
              <div key={time} className="water-module__slot">
                <span>
                  {time.startsWith("0") ? (
                    <>
                      <span style={{ opacity: 0 }}>0</span>
                      {time.slice(1)}
                    </>
                  ) : (
                    time
                  )}
                </span>
                <CupIcon size={36} filled={true} />
              </div>
            ))}
          </div>
        ))}
    </section>
  );
}
