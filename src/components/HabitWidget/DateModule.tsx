import './HabitWidget.css'
import { useApp } from '../../context/AppContext'

export function DateModule() {
  const { currentDate } = useApp()

  if (!currentDate) {
    return (
      <section className="date-module" aria-label="Date summary">
        <div className="date-module__weekday">---</div>
        <div className="date-module__details">
          <span>Loading...</span>
          <span>---</span>
          <span>---</span>
        </div>
      </section>
    )
  }

  const weekday = currentDate.weekday
  const date = currentDate.formattedDate
  const dayOfYear = `Day ${currentDate.dayOfYear}`
  const weekOfYear = `Week ${currentDate.weekOfYear}`

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
