import './HabitWidget.css'

export function DateModule() {
  const weekday = 'Sun'
  const date = '13 Oct'
  const dayOfYear = 'Day 182'
  const weekOfYear = 'Week 23'

  return (
    <section className="date-module" aria-label="Date summary">
      <div className="date-module__weekday">{weekday}</div>
      <div className="date-module__details">
        <span>{date}</span>
        <span>{dayOfYear}</span>
        <span>{weekOfYear}</span>
      </div>
    </section>
  )
}
