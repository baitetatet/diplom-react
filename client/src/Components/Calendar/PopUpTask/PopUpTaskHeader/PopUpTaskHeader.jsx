export const PopUpTaskHeader = ({ description }) => {
	return (
		<div className="calendar__popup__header">
			<div className="calendar__task__close calendar__popup__header__close" />
			<h3 className="calendar__popup__header__title">{description}</h3>
		</div>
	)
}
