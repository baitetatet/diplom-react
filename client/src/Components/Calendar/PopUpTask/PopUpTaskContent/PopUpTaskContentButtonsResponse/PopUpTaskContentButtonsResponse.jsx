export const PopUpTaskContentButtonsResponse = () => {
	const VARIABLES = {
		downloadFile: "Скачать файл",
	}
	const handlerClickDownloadFile = event => {}
	return (
		<div className="category__content_download-file">
			<button
				className="category__content__download-file_button button"
				onClick={event => handlerClickDownloadFile(event)}
			>
				{VARIABLES.downloadFile}
			</button>
		</div>
	)
}
