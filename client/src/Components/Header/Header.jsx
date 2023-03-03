import { useState, useEffect } from "react"
import imgLogo from "images/logo.png"
import { useContext } from "react"
import { UserData } from "UserDataContext"
import Axios from "axios"

export const Header = ({ setLogged }) => {
	const [time, setTime] = useState(new Date().toLocaleTimeString())
	const [date, setDate] = useState(new Date().toLocaleDateString())
	const { userData } = useContext(UserData)
	const userName = [
		userData.rank.toLowerCase(),
		userData.name,
		userData.surname,
	].join(" ")

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date().toLocaleTimeString())
			setDate(
				new Date().toLocaleString("ru", {
					weekday: "long",
					day: "numeric",
					month: "long",
					year: "numeric",
				})
			)
		})
		return () => clearInterval(interval)
	}, [])

	const handlerLogOut = () => {
		Axios.get("http://localhost:8000/log-out")
			.then(res => console.log(res))
			.catch(err => console.log(err))
		setLogged(false)
	}

	return (
		<div className="header">
			<div className="header__inner">
				<div className="logo">
					<img src={imgLogo} alt="logo__img" />
				</div>
				<div className="header__clock">
					<div>{time}</div>
					<div className="header__date">{date}</div>
				</div>
				<div className="header__user">
					<p>{userName}</p>
					<button className="header__logout" onClick={handlerLogOut} />
				</div>
			</div>
		</div>
	)
}
