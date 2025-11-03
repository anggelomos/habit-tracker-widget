import "./HabitWidget.css";
import { CupIcon, CupIconFull, CupIconHalf } from "./icons";
import { useApp } from "../../context/AppContext";
import { saveHabits } from "../../api";
import { WaterStatus, type WaterIntake } from "../../models";

const waterSchedule = [
  ["06a", "07a", "08a", "09a", "10a", "11a"],
  ["12a", "01p", "02p", "03p", "04p", "05p"],
];

export function WaterCupsModule() {
  const { currentHabits, updateCurrentHabits } = useApp();

  const handleCupClick = async (timeId: string) => {
    if (!currentHabits) return;

    const existingIntake = currentHabits.waterIntakes.find(
      (intake) => intake.id === timeId
    );

    let updatedWaterIntakes: WaterIntake[];

    if (existingIntake) {
      // Toggle status: empty -> half -> full -> empty
      let newStatus: typeof WaterStatus[keyof typeof WaterStatus];
      if (existingIntake.status === WaterStatus.Empty) {
        newStatus = WaterStatus.Half;
      } else if (existingIntake.status === WaterStatus.Half) {
        newStatus = WaterStatus.Full;
      } else {
        newStatus = WaterStatus.Empty;
      }

      updatedWaterIntakes = currentHabits.waterIntakes.map((intake) =>
        intake.id === timeId
          ? { ...intake, timestamp: new Date(), status: newStatus }
          : intake
      );
    } else {
      // Create new WaterIntake with status "half"
      const newIntake: WaterIntake = {
        id: timeId,
        timestamp: new Date(),
        status: WaterStatus.Half,
      };
      updatedWaterIntakes = [...currentHabits.waterIntakes, newIntake];
    }

    const updatedHabits = {
      ...currentHabits,
      waterIntakes: updatedWaterIntakes,
    };

    // Update local state
    updateCurrentHabits(updatedHabits);

    // Save to API
    try {
      await saveHabits(updatedHabits);
    } catch (error) {
      console.error("Failed to save water intake:", error);
    }
  };

  const getCupIcon = (timeId: string) => {
    if (!currentHabits) return <CupIcon />;

    const intake = currentHabits.waterIntakes.find(
      (intake) => intake.id === timeId
    );

    if (!intake || intake.status === WaterStatus.Empty) {
      return <CupIcon />;
    } else if (intake.status === WaterStatus.Half) {
      return <CupIconHalf />;
    } else {
      return <CupIconFull />;
    }
  };

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
              <button
                onClick={() => handleCupClick(time)}
                aria-label={`Track water intake for ${time}`}
              >
                {getCupIcon(time)}
              </button>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
