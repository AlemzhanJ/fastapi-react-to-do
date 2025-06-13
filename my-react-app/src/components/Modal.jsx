import { X } from '@phosphor-icons/react'
import axios from 'axios'
import { useState } from 'react'

function getRandomExcept(excluded, min, max) {
        const allowed = []

        for (let i = min; i <= max; i++) {
            if (!excluded.includes(i)) {
            allowed.push(i)
            }
        }

        if (allowed.length === 0) throw new Error("Нет допустимых чисел!")

        const randomIndex = Math.floor(Math.random() * allowed.length)
        return allowed[randomIndex]
        }
    
function getTasksIds(tasks){
    let ids = []
    for (const task of tasks){
        ids.push(task.id)
    }

    return ids
}



export function Modal({setClicked, otherTasks, addTask, setAreTasksLoading}){
    
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')


    
   async function addNewTask() {
        setAreTasksLoading(true)
        setClicked(false)
        const new_task = await axios.post('http://localhost:8000/tasks/', {
            name: taskName,
            description: taskDescription
        },
        {
            withCredentials: true
        })
        addTask([...otherTasks, new_task.data])
        setAreTasksLoading(false)
        
   }
    


    return(

        <div className = 'fixed inset-0 bg-black/40 z-50'
             onClick = {() => setClicked(false)}
        >
        <div className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl border border-neutral-800 bg-neutral-900 rounded-lg z-60'>
            <form className = 'relative flex flex-col gap-4 w-full p-6'
                  onSubmit = { async (e) => {
                    e.preventDefault()
                    await addNewTask()
                    
                    
                  }}
                  onClick = { e => {
                    e.stopPropagation()
                  }}
            >
                <button className = 'absolute top-1 right-1 hover:text-neutral-200 text-neutral-500'
                        onClick = {() => setClicked(false)}
                >
                    <X size = {18}/>
                </button>
                <section className = 'flex flex-col gap-1'>
                    <label htmlFor = 'name' 
                        className = 'text-neutral-200 text-sm' 
                    >
                        Name:
                    </label>
                    <input id = 'name' 
                        type = 'text' 
                        className = 'p-1 text-neutral-200 bg-neutral-900 border border-neutral-800 outline-none focus:border-neutral-700 rounded-md w-full'
                        required
                        onChange = {e => setTaskName(e.target.value)}
                        placeholder = 'The name of the new task'
                    />

                </section>
                <section className = 'flex flex-col gap-1'>
                    <label htmlFor = 'description' 
                        className = 'text-neutral-200 text-sm' 
                    >
                        Description:
                    </label>
                    <input id = 'description' 
                        type = 'text' 
                        className = 'p-1 text-neutral-200 bg-neutral-900  border border-neutral-800 outline-none focus:border-neutral-700 rounded-md w-full'
                        required
                        onChange = {e => setTaskDescription(e.target.value)}
                        placeholder = 'The description of the new task'
                    />

                </section>
                <input type = 'submit'
                    className = 'mt-6 py-3 w-full rounded-lg flex justify-center items-center bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
                    value = 'Add task'
                />
            </form>

        </div>
        </div>
    )
}