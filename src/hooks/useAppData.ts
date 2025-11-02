/**
 * Re-export the useApp hook for convenience
 * This makes it clear that this is how components should access global app data
 */
export { useApp } from '../context/AppContext';

/**
 * Example usage in a component:
 * 
 * import { useApp } from './hooks/useAppData';
 * 
 * function MyComponent() {
 *   const { currentDate, currentHabits, currentTimeStats, isLoading, error, refreshData } = useApp();
 *   
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   
 *   return (
 *     <div>
 *       <p>Date: {currentDate?.formattedDate}</p>
 *       <p>Day of Year: {currentDate?.dayOfYear}</p>
 *       <p>Week: {currentDate?.weekOfYear}</p>
 *       <p>Habits: {currentHabits?.habitCheckins.length}</p>
 *       <p>Focus Time: {currentTimeStats?.focusedTimeWork}h</p>
 *       <button onClick={refreshData}>Refresh</button>
 *     </div>
 *   );
 * }
 */

