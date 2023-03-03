import { useState } from "react"
import Axios from "axios"

export const Authorization = ({ setLogged, setUserData }) => {
	const [incorrectLogin, setIncorrectLogin] = useState(false)
	const [login, setLogin] = useState(null)
	const [password, setPassword] = useState(null)
	const VARIABLES = {
		title: "Авторизация",
		btnSubmit: "Войти",
		incorrectLoginSpan: "Неверный логин или пароль",
	}

	Axios.defaults.withCredentials = true

	const handlerAuthorizationSubmit = event => {
		event.preventDefault()
		Axios.post("http://localhost:8000/authorization", {
			login: login,
			password: password,
		}).then(res => {
			const userData = res.data

			if (!userData.length) {
				setIncorrectLogin(true)
			} else {
				setUserData(userData[0])
				setLogged(true)
			}
		})
	}
	return (
		<div className="authorization">
			<div className="authorization__inner">
				<h2 className="authorization__title">{VARIABLES.title}</h2>
				{incorrectLogin && (
					<span className="authorization__incorrect">
						{VARIABLES.incorrectLoginSpan}
					</span>
				)}
				<form
					className="authorization__form"
					onSubmit={event => handlerAuthorizationSubmit(event)}
				>
					<input
						id="login"
						name="login"
						type="login"
						placeholder="Логин"
						onChange={event => setLogin(event.target.value)}
						required
					/>
					<input
						id="password"
						name="password"
						type="password"
						placeholder="Пароль"
						onChange={event => setPassword(event.target.value)}
						required
					/>
					<button className="authorization__form_submit" type="submit">
						{VARIABLES.btnSubmit}
					</button>
				</form>
			</div>
		</div>
	)
}
