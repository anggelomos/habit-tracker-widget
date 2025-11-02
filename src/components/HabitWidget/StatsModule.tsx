import './HabitWidget.css'

const stats = {
  ftw: 12.5,
  ftp: 10.5,
  ftr: 8.3,
  lt: 11.6,
}

export function StatsModule() {
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
