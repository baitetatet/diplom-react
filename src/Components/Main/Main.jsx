import { Nav } from "./Nav/Nav"
import { Calendar } from "../Main/Calendar/Calendar"
import styles from './styles.module.css'

export const Main = () => {
  return (
    <>
      <div className="main">
        <Nav />
        <Calendar />
      </div>
    </>
  )
}