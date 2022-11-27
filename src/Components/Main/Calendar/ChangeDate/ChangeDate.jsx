import prevArrow from '../../../../images/prevArrow.png'
import nextArrow from '../../../../images/nextArrow.png'

export const ChangeDate = ({ title, date, handlerArrowClick }) => {

  return (
    <div className='changeDate'>
      <button
        className='changeDate__button prevArrow'
        onClick={(event => handlerArrowClick(event))}
      >
        <img src={prevArrow} alt="arrow" />
      </button>
      <div className='changeDate__text'>
        {title}
      </div>
      <button
        className='changeDate__button nextArrow'
        onClick={(event => handlerArrowClick(event))}
      >
        <img src={nextArrow} alt="arrow" />
      </button>
    </div>
  )
}