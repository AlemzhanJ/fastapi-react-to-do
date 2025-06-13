import { PencilSimpleIcon, Trash, X, CheckIcon } from '@phosphor-icons/react'
import axios from 'axios'
import { useState } from 'react'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export function TaskCard({task, setTasks, allTasks, setAreTasksLoading}){

    const [editMode, setEditMode] = useState(false)
    const [taskName, editName] = useState(task.name)
    const [taskDescription, editDescription] = useState(task.description)



    async function deleteTask(taskId){
        console.log('Delete task...')
        try {
          setAreTasksLoading(true)
          const remainedTasks = await axios.delete(`${backendUrl}/tasks/`,{
          params:{
            task_id: taskId
          },
          withCredentials: true
          })
          setTasks(remainedTasks.data.tasks)
          setAreTasksLoading(false)
        } catch(err){
          console.log(err?.response?.data?.detail)
        }
    }

    

    async function editTask(){

        if (taskName === task.name && taskDescription === task.description){
            setEditMode(false)
            return
        }
        setAreTasksLoading(true)
        try{

          const edited_task = await axios.put(`${backendUrl}/tasks/`,
            {id: task.id, name: taskName, description: taskDescription},
            {withCredentials: true}
          )

          const updatedTasks = allTasks.map(singleTask => 
            singleTask.id === task.id 
            ? {...singleTask, name: edited_task.data.name, description: edited_task.data.description}
            : singleTask
            )

            setTasks(updatedTasks)  
            setEditMode(false)
            setAreTasksLoading(false)

        } catch(err){

          console.log(err?.response?.data?.detail)

        }
        

    }

    return(
        <div className = 'relative rounded-lg hover:bg-neutral-800 hover:border-neutral-700 bg-neutral-900 text-neutral-200 rouded-large p-4 sm:p-6 border border-neutral-800 w-full max-w-lg transition break-words'>
            <button className = 'absolute top-2 right-2 hover:text-red-400 text-neutral-500'
                    onClick = {async() => {
                        await deleteTask(task.id)
                    }}
            >
                <Trash size = {16} />
            </button>
            
            
            {!editMode 
            ? (<div className = 'flex flex-col gap-6'>
              <button className = 'absolute top-2 right-7 hover:text-neutral-200 text-neutral-500'
                      onClick = {() => {
                        editName(task.name)
                        editDescription(task.description)
                        setEditMode(true)

                      }}>
                <PencilSimpleIcon size = {16} />
              </button>
              <h1 className = 'text-xl'>{task.name}</h1>
              <p className = 'text-md w-full text-neutral-400'>{task.description}</p>
              </div>)

              
            : (<form className = 'flex flex-col gap-6 mt-3'
                     onSubmit = { e => {
                        e.preventDefault()
                        editTask()
                     }}
               >
              <button type = 'submit' 
                     className = 'absolute top-2 right-12 hover:text-neutral-200 text-neutral-500'            
              >
                <CheckIcon size = {16} />
              </button>
              <button className = 'absolute top-2 right-7 hover:text-red-400 text-neutral-500'
                      onClick = {() => setEditMode(false)}>
                <X size = {16} />
              </button>

              
              <input type = 'text' 
                     className = 'text-xl py-0 px-1 bg-neutral-700 rounded-lg outline-none mt-1'
                     required
                     onChange = { e => {
                        editName(e.target.value)
                     }}
                     value = {taskName}

              />
              <input type = 'text' 
                     className = 'text-md py-0 px-1 bg-neutral-700 rounded-lg outline-none'
                     required
                     onChange = { e => {
                        editDescription(e.target.value)
                     }}
                     value = {taskDescription}

              />
              </form>)
            }
            
            
            
        </div>
    )
}