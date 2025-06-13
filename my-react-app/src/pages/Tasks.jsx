import { TaskCard } from '../components/Task'

import { useEffect, useState } from 'react'

import { Modal } from '../components/Modal'
import axios from 'axios'
import { LoadingSpinner } from '../components/Loading'







function TaskBar(){
    const [targetTask, inputTargetTask] = useState('')
    const [tasks, setTasks] = useState([])
    const [tasksLoading, setAreTasksLoading] = useState(true)
    const [clicked, setClicked] = useState(false)

    async function showTasks() {
        const taskList = await axios.get('http://localhost:8000/tasks/', {
            withCredentials: true
        })
        setAreTasksLoading(false)
        return taskList
    }

    useEffect(() => {
        async function fetchTasks() {
          try {
            const taskList = await showTasks()
            setTasks(taskList.data.tasks)
          } catch (err) {
            console.error('Ошибка при загрузке задач:', err)
          }
        }
      
        fetchTasks()
      }, [])
      

    return(
        <main className = 'relative bg-black min-h-screen pt-60 pb-10'>
            <section className = 'absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-lg'>
                <div className = 'flex flex-col gap-4'>
                    <input className = 'p-1 text-neutral-200 border border-neutral-700 outline-none focus:border-neutral-600 rounded-md w-full'
                        type = 'text'
                        onChange = { e => inputTargetTask(e.target.value)}
                        placeholder = 'Search for a task...'

                    />
                    <button className = 'text-neutral-200 hover:bg-neutral-800 bg-neutral-900 py-2 text-lg w-full rounded-lg'
                            onClick = {() => setClicked(true)}>
                        Add new task
                    </button>
                </div>


            </section>
            {
                !tasksLoading
                ? (<section className = 'flex justify-center items-center flex-col gap-4'>

                     {tasks
                     .filter(task => task.name.toLowerCase().includes(targetTask.toLowerCase()) || !targetTask)
                     .map(task => (
                         <TaskCard task = {task} 
                                   key = {task.id} 
                                   setTasks = {setTasks} 
                                   allTasks = {tasks}
                                   setAreTasksLoading = {setAreTasksLoading}
                         />
                     ))}
                 </section>)
                : (
                   <div className = 'w-full flex justify-center items-center p-12'>
                      <LoadingSpinner size = {36}/>
                   </div>
                  )
            }
            { clicked && <Modal setClicked = {setClicked} otherTasks = {tasks} addTask = {setTasks} setAreTasksLoading = {setAreTasksLoading}/>}
        </main>

    )
    
}

export default TaskBar