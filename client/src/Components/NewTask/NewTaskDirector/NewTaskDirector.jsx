export const NewTaskDirector = () => {
  const VARIABLES = {
    title: 'Руководитель:'
  }
  return (
    <div className="new-task__director">
      <label htmlFor="director">
        <h3 className="new-task__director_title">{VARIABLES.title}</h3>
        <select name="director" id="director">
          <option value="">НА</option>
        </select>
      </label>
    </div>
  )
}