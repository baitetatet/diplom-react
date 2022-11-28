import { useState, useEffect } from "react"
import styles from './styles.module.css'
import imgLogo from '../../images/logo.png'
import { useContext } from "react"
import { Database } from "../../DatabaseContext"

export const Header = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [date, setDate] = useState(new Date().toLocaleDateString())
  const { database } = useContext(Database)
  const userData = database.userData
  const userName = [userData.rank.toLowerCase(), userData.name, userData.surname].join(' ')

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
      setDate(new Date().toLocaleString('ru', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }))
    })
    return () => clearInterval(interval)
  }, [])


  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__inner}>
          <div className={styles.logo} >
            <img src={imgLogo} alt="logo" />
          </div>
          <div className={styles.clock}>
            <div>{time}</div>
            <div className={styles.date}>{date}</div>
          </div>
          <div className={styles.user}>
            <p>{userName}</p>
            <button className={styles.log_out}></button>
          </div>
        </div>
      </div>
    </>
  )
}