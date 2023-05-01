import Axios from "axios"

export const PopUpTaskContentButtonsResponse = ({ stage }) => {
	const VARIABLES = {
		downloadFile: "Скачать файл",
	}

	const handlerClickDownloadFile = () => {
		Axios.post("/set-active-stage-for-download", {
			stageId: stage.id,
		})
			.then(() => {
				Axios({
					url: "http://localhost:8000/stage-file",
					method: "GET",
					responseType: "blob",
				})
					.then(response => {
						const url = window.URL.createObjectURL(new Blob([response.data]))
						const link = document.createElement("a")

						link.href = url
						link.setAttribute("download", "Файл.doc")
						document.body.appendChild(link)
						link.click()
						link.remove()
					})
					.catch(error => console.log(error))
			})
			.catch(err => console.log(err))
	}
	return (
		<div className="category__content_download-file">
			<div
				className="category__content__download-file_button button"
				onClick={event => handlerClickDownloadFile(event)}
			>
				{VARIABLES.downloadFile}
			</div>
		</div>
	)
}
