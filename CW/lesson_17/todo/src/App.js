import logo from './logo.svg'
import TD from './todoItem'

import './App.css'

const todosData = [
    {
        id: 1,

        text: 'Take out the trash',

        completed: true,
    },

    {
        id: 2,

        text: 'Grocery shopping',

        completed: false,
    },

    {
        id: 3,

        text: 'Clean gecko tank',

        completed: false,
    },

    {
        id: 4,

        text: 'Mow lawn',

        completed: true,
    },

    {
        id: 5,

        text: 'Catch up on Arrested Development',

        completed: false,
    },
]

function App() {
    return (
        <>
            {todosData.map((i) => (
                <TD key={i.id} text={i.text} completed={i.completed}></TD>
            ))}
        </>
    )
}

export default App
