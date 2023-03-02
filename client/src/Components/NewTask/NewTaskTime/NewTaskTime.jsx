export const NewTaskTime = () => {
  const VARIABLES = {
    title: 'Время: ',
    labelTimeStart: 'с',
    labelTimeEnd: 'до'
  }

  return (
    <div className='new-task__time' >
      <h3 className='new-task__time_title'>{VARIABLES.title}</h3>
      <label htmlFor='timeStart'>
        {VARIABLES.labelTimeStart}
        <input
          name="timeStart"
          id="timeStart"
          type='time'
        />
      </label>
      <label htmlFor='timeEnd'>
        {VARIABLES.labelTimeEnd}
        <input
          name="timeEnd"
          id="timeEnd"
          type='time'
        />
      </label>
    </div >
  )
}