import "./HabitWidget.css";
import { BrushIcon, BrushIconFilled } from "./icons";
import { useApp } from "../../context/AppContext";
import { saveHabits } from "../../api";
import { CheckinStatus } from "../../models";
import type { BrushSession } from "../../models";

const brushSlots = Array.from(
  { length: 4 },
  (_, index) => ({ label: `Brush ${index + 1}`, id: `brush_${index + 1}` })
);

export function BrushModule() {
  const { currentHabits, updateCurrentHabits } = useApp();

  const handleBrushClick = async (brushId: string) => {
    if (!currentHabits) return;

    const existingSessionIndex = currentHabits.brushSessions.findIndex(
      (session) => session.id === brushId
    );

    let updatedSessions: BrushSession[];

    if (existingSessionIndex !== -1) {
      // Session exists, toggle status and update timestamp
      const existingSession = currentHabits.brushSessions[existingSessionIndex];
      const newStatus =
        existingSession.status === CheckinStatus.Completed
          ? CheckinStatus.Skipped
          : CheckinStatus.Completed;

      updatedSessions = [...currentHabits.brushSessions];
      updatedSessions[existingSessionIndex] = {
        ...existingSession,
        timestamp: new Date(),
        status: newStatus,
      };
    } else {
      // Session doesn't exist, create new one with completed status
      const newSession: BrushSession = {
        id: brushId,
        timestamp: new Date(),
        status: CheckinStatus.Completed,
      };
      updatedSessions = [...currentHabits.brushSessions, newSession];
    }

    const updatedHabits = {
      ...currentHabits,
      brushSessions: updatedSessions,
    };

    // Update local state and storage
    updateCurrentHabits(updatedHabits);

    // Send to API
    try {
      await saveHabits(updatedHabits);
    } catch (error) {
      console.error("Failed to save habits:", error);
    }
  };

  const getBrushStatus = (brushId: string): CheckinStatus | null => {
    if (!currentHabits) return null;
    const session = currentHabits.brushSessions.find(
      (session) => session.id === brushId
    );
    return session ? session.status : null;
  };

  return (
    <section className="brush-module" aria-label="Brush reminders">
      <div className="brush-module__grid">
        {brushSlots.map(({ label, id }) => {
          const status = getBrushStatus(id);
          const isCompleted = status === CheckinStatus.Completed;
          const IconComponent = isCompleted ? BrushIconFilled : BrushIcon;

          return (
            <span
              key={label}
              className="brush-module__slot"
              aria-hidden="true"
              onClick={() => handleBrushClick(id)}
              style={{ cursor: "pointer" }}
            >
              <IconComponent size={1} />
            </span>
          );
        })}
      </div>
    </section>
  );
}
