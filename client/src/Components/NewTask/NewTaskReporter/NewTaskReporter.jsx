export const NewTaskReporter = () => {
  const VARIABLES = {
    title: 'Кто готов.: '
  }
  return (
    <div className="new-task__reporter">
      <label htmlFor="reporter">
        <h3 className="new-task__reporter_title">{VARIABLES.title}</h3>
        <select name="reporter" id="reporter">
          <option value="">НА</option>
        </select>
      </label>
    </div>
  )
}