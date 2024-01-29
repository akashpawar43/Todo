import React, { useEffect, useState } from 'react'
import Todoitems from './Todoitems'
import axios from 'axios'

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    // const todos = [
    //     { id: 1, name: "Task 1", description: "This is my task one" , complete: true},
    //     { id: 2, name: "Task 2", description: "This is my task two", complete: false},
    //     { id: 3, name: "Task 3", description: "This is my task three", complete: true},
    //     { id: 4, name: "Task 4", description: "This is my task four", complete: true},
    // ]

    useEffect(() => {
        axios.get("http://localhost:4000/")
            .then(res => setTodos(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <section className='bg-zinc-700 rounded-md mt-4 w-full'>
            <ul className='grid grid-cols-1 rounded-md'>
                {todos.length > 0 ? (
                    todos.map((todo, i) => (
                        <Todoitems key={i} id={todo._id} name={todo.name} description={todo.description} complete={todo.complete} />
                    )))
                    : (<p className='text-white text-center p-4'>There is no Todo right now</p>)
                }
            </ul>
        </section>
    )
}
