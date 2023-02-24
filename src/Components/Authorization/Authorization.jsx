import { useState } from "react"
import database from '../../database/database.json'

export const Authorization = ({ setLogged, setDatabase }) => {
  const [incorrectLogin, setIncorrectLogin] = useState(false)
  const [login, setLogin] = useState(null)
  const [password, setPassword] = useState(null)
  const VARIABLES = {
    title: 'Авторизация',
    btnSubmit: 'Войти',
    incorrectLoginSpan: 'Неверный логин или пароль'
  }

  const handlerAuthorizationSubmit = (event) => {
    event.preventDefault()
    const userData = authorization(login, password)
    if (userData) {
      console.log(...userData)
      setDatabase(...userData)
      setLogged(true)

    }
    !userData && setIncorrectLogin(true)
  }
  const authorization = (login, password) => {
    const userData = database.filter(user => user["userData"]["login"] === login && user["userData"]["password"] === password)
    return userData.length === 0 ? null : userData
  }
  return (
    <div className="authorization">
      <div className="authorization__inner">
        <h2 className="authorization__title">
          {VARIABLES.title}
        </h2>
        {
          incorrectLogin && <span className="authorization__incorrect">{VARIABLES.incorrectLoginSpan}</span>
        }
        <form
          className="authorization__form"
          action=""
          onSubmit={(event) => handlerAuthorizationSubmit(event)}
        >
          <input
            id="login"
            name="login"
            type="login"
            placeholder="Логин"
            onChange={(event) => setLogin(event.target.value)}
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            className="authorization__form_submit"
            type="submit"
          >
            {VARIABLES.btnSubmit}
          </button>
        </form>
      </div>
    </div>
  )
}