import { useState } from "react"

export const SelectFormatTable = ({
	activeTable,
	setActiveTable,
	classN,
	optionValues,
}) => {
	const [activeState, setActiveState] = useState(false)

	return (
		<div
			className={classN}
			onMouseLeave={() => {
				if (activeState) {
					setActiveState(prev => !prev)
				}
			}}
		>
			<button
				className={classN + (activeState ? "__btn_active" : "__btn")}
				onClick={() => {
					setActiveState(prev => !prev)
				}}
			>
				<span className={classN + "__btn_span"}>{activeTable}</span>
			</button>
			<div className={classN + "__menu"}>
				<ul
					className={classN + "__list"}
					onClick={event => {
						setActiveState(prev => !prev)
						setActiveTable(event.target.innerHTML)
					}}
				>
					{optionValues.map(value => (
						<button key={value.id} className={classN + "__list__item"}>
							<span
								data-value={value.post}
								className={classN + "__list__item_text"}
							>
								{value.post}
							</span>
						</button>
					))}
				</ul>
			</div>
		</div>
	)
}
