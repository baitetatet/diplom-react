import { Nav } from "./Nav/Nav"
import { Calendar } from "../Main/Calendar/Calendar"

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