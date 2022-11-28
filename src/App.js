import { useState } from "react"
import { Header } from "./Components/Header/Header"
import { Main } from './Components/Main/Main'
import { Database } from "./DatabaseContext"


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
          data: '26.11.2022',
          startTime: '08:00',
          taskOfThisTime: [
            {
              content: 'Совещание Lorem ipsum dolor sit.',
              type: 'green',
              id: 1
            },
            {
              content: 'Проверка Lorem ipsum dolor sit.',
              type: 'red',
              id: 2
            }
          ]
        },
        {
          data: '26.11.2022',
          startTime: '11:00',
          taskOfThisTime: [
            {
              content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum deleniti perspiciatis, alias voluptatum incidunt.',
              type: 'green',
              id: 3
            }
          ]
        },
        {
          data: '28.11.2022',
          startTime: '09:00',
          taskOfThisTime: [
            {
              content: 'Проверка Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, labore!',
              type: 'green',
              id: 4
            }
          ]
        }
      ]
    })

  return (
    <>
      <div className="wrapper">
        <Database.Provider value={{ database, setDatabase }}>
          <Header />
          < Main />
        </Database.Provider>
      </div>
    </>
  )
}