import Axios from "axios"
import avatarSRC from "images/avatar.png"
import { useEffect, useState } from "react"

export const ConfirmationTask = ({ taskData }) => {
	const VARIABLES = {
		avatarSRC: avatarSRC,
		timeComplete: "Сегодня в 11:38",
		downLoadButton: "Скачать файл",
		confirmButton: "Подтвердить",
	}
	const [reporterData, setReporterData] = useState({
		rank: "звание",
		surname: "Фамилия",
		name: "Имя",
		post: "Должность",
	})
	useEffect(() => {
		Axios.post("/get-name", { userPost: taskData.reporter })
			.then(res => setReporterData(...res.data))
			.catch(err => console.log(err))
	}, [taskData.reporter, reporterData])
	const prepareUserName = () => {
		return (
			[
				reporterData.rank.toLowerCase(),
				reporterData.surname,
				reporterData.name[0] + ".",
			].join(" ") +
			"(" +
			reporterData.post +
			")"
		)
	}

	return (
		<article className="confirmation-task">
			<div className="confirmation-task__inner">
				<div className="confirmation-task__header">
					<div className="confirmation-task__user-info">
						<div className="confirmation-task__user-info_avatar">
							<img src={VARIABLES.avatarSRC} alt="avatar" />
						</div>
						<div className="confirmation-task__user-info_name">
							{prepareUserName()}
						</div>
					</div>
					{/* <div className="confirmation-task__time-complete">
						{VARIABLES.timeComplete}
					</div> */}
				</div>
				<div className="confirmation-task__content">{taskData.description}</div>
				<div className="confirmation-task__buttons">
					<button className="confirmation-task__buttons_download-file button-grey">
						{VARIABLES.downLoadButton}
					</button>
					<button className="confirmation-task__buttons_confirm button-grey">
						{VARIABLES.confirmButton}
					</button>
				</div>
			</div>
		</article>
	)
}
