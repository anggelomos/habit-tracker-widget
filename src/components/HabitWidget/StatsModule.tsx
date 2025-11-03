import './HabitWidget.css'
import { useApp } from '../../context/AppContext'

export function StatsModule() {
  const { currentTimeStats } = useApp()

  const stats = {
    ftw: currentTimeStats?.focusedTimeWork ?? 0,
    ftp: currentTimeStats?.focusedTimePersonal ?? 0,
    ftr: currentTimeStats?.focusedTimeRescuetime ?? 0,
    lt: currentTimeStats?.leisureTime ?? 0,
  }

  return (
    <section className="stats-module" aria-label="Weekly statistics">
      <div className="stats-module__grid">
        {Object.entries(stats).map(([label, value]) => (
          <div key={label} className="stats-module__item">
            <span className="stats-module__value">{value}</span>
            <span className="stats-module__label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
