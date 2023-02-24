import { useState } from "react"
import { Calendar } from "Components/Calendar/Calendar"
import { Routes, Route } from 'react-router-dom'
import { Database } from "DatabaseContext"
import { Layout } from "Components/Layout";
import { NewTask } from "Components/NewTask/NewTask";
import { ConfirmationTasks } from "Components/ConfirmationTasks/ConfirmationTasks";
import { Authorization } from "Components/Authorization/Authorization";


export const App = () => {
  const [isLogged, setLogged] = useState(false)
  const [database, setDatabase] = useState(null)

  return (
    <>
      {isLogged ?
        <div className="wrapper">
          <Database.Provider value={{ database, setDatabase }}>
            <Routes>
              <Route path="/" element={<Layout setLogged={setLogged} />}>
                <Route index element={<Calendar />} />
                <Route path="new-task" element={<NewTask />} />
                <Route path="confirmation-tasks" element={<ConfirmationTasks />} />
              </Route>
            </Routes>
          </Database.Provider>
        </div>
        :
        <Authorization setLogged={setLogged} setDatabase={setDatabase} />
      }
    </>
  )
}