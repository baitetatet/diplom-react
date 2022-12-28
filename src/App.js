import { useState } from "react"
import { Calendar } from "./Components/Calendar/Calendar"
import { Routes, Route } from 'react-router-dom'
import { Database } from "./DatabaseContext"
import { Layout } from "./Components/Layout";
import { NewTask } from "./Components/NewTask/NewTask";


export const App = () => {
  const [database, setDatabase] = useState(
    {
      userData: {
        name: 'Иван',
        surname: 'Иванов',
        rank: 'Подполковник',
        post: 'Начальник сулжбы РАВ'
      },
      tasks: [
        {
          date: '26.11.2022',
          startTime: '08:00',
          taskOfThisTime: [
            {
              content: 'Совещание Lorem ipsum dolor sit.',
              confirm: false,
              type: 'green',
              id: 1
            },
            {
              content: 'Проверка Lorem ipsum dolor sit.',
              confirm: false,
              type: 'red',
              id: 2
            }
          ]
        },
        {
          date: '26.11.2022',
          startTime: '11:00',
          taskOfThisTime: [
            {
              content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum deleniti perspiciatis, alias voluptatum incidunt.',
              confirm: false,
              type: 'green',
              id: 3
            }
          ]
        },
        {
          date: '6.12.2022',
          startTime: '09:00',
          taskOfThisTime: [
            {
              content: 'Проверка Lorem ipsum dolor sit amet consecteturadipisicing elit. Libero, labore!',
              confirm: false,
              type: 'green',
              id: 4
            },
            {
              content: 'Проверка Lorem ipsum dolor sit aet consectetur adipisicing elit. Libero, labore!',
              confirm: false,
              type: 'green',
              id: 7
            },
            {
              content: 'Проверка Lorem ipsm dolor sit amet consectetur adipisicing elit. Libero, labore!',
              confirm: false,
              type: 'green',
              id: 6
            },
            {
              content: 'Проверка Lorem ipum dolor sit amet consectetur adipisicing elit. Libero, labore!',
              confirm: false,
              type: 'green',
              id: 5
            },
            {
              content: 'Проверка Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, labore!',
              confirm: false,
              type: 'green',
              id: 8

            },
            {
              content: 'Проверка Lorem ipsum dolo sit amet cosectetur adipisicing elit. Libero, labore!',
              confirm: false,
              type: 'green',
              id: 8
            },
            {
              content: 'Проверка Lorem psum dolor sit amet consectetur adipisicing elit. Libero, labore!',
              confirm: false,
              type: 'green',
              id: 8
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
            </Route>
          </Routes>
        </Database.Provider>
      </div>
    </>
  )
}