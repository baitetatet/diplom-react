import { useState, useEffect } from "react"
import styles from './styles.module.css'
import imgLogo from '../../images/logo.png'

export const Header = ({ user }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [date, setDate] = useState(new Date().toLocaleDateString())

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
            <p>{user?.name || 'Unknown'}</p>
            <button className={styles.log_out}></button>
          </div>
        </div>
      </div>
    </>
  )
}