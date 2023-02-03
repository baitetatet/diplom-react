import { useState } from "react"
import { Calendar } from "Components/Calendar/Calendar"
import { Routes, Route } from 'react-router-dom'
import { Database } from "DatabaseContext"
import { Layout } from "Components/Layout";
import { NewTask } from "Components/NewTask/NewTask";
import { ConfirmationTasks } from "Components/ConfirmationTasks/ConfirmationTasks";


export const App = () => {
  const [database, setDatabase] = useState(
    {
      userData: {
        name: 'Иван',
        surname: 'Иванов',
        rank: 'Подполковник',
        post: 'Начальник службы РАВ'
      },
      tasks: [
        {
          date: '31.01.2023',
          startTime: '08:00',
          taskOfThisTime: [
            {
              content: 'Пример (Lorem ipsum dolor sit amet.)',
              confirm: false,
              type: 'green',
              id: 1
            },
            {
              content: 'Пример (Lorem ipsum dolor sit amet.)',
              confirm: false,
              type: 'red',
              id: 2
            }
          ]
        },
        {
          date: '31.01.2023',
          startTime: '11:00',
          taskOfThisTime: [
            {
              content: 'Lorem Lorem, ipsum dolor.ipsum dolor sit amet consectetur adipisicing elit. A earum deleniti perspiciatis, alias voluptatum incidunt.',
              confirm: false,
              type: 'green',
              id: 3
            }
          ]
        },
        {
          date: '27.12.2022',
          startTime: '19:00',
          taskOfThisTime: [
            {
              content: 'Проверка Lorem ipsum dolor sit amet Libero, labore!',
              confirm: false,
              type: 'green',
              id: 4
            },
            {
              content: 'Проверка Lorem ipsum dolor sit aet consectetur adipisicing elit. Libero, labore!',
              confirm: false,
              type: 'green',
              id: 7
            }
          ]
        }
      ]
    })

  return (
    <>
      <div className="wrapper">
        <Database.Provider value={{ database, setDatabase }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Calendar />} />
              <Route path="new-task" element={<NewTask />} />
              <Route path="confirmation-tasks" element={<ConfirmationTasks />} />
            </Route>
          </Routes>
        </Database.Provider>
      </div>
    </>
  )
}