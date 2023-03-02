export const NewTaskInvolved = () => {
  const VARIABLES = {
    title: 'Кто привлекается: '
  }

  return (
    <div className="new-task__involved">
      <label htmlFor="involved">
        <h3 className="new-task__involved_title">{VARIABLES.title}</h3>
        <select name="involved" id="involved">
          <option value="">НА</option>
        </select>
      </label>
    </div>
  )
}