import { useState } from 'react'
import { useMemo, useEffect } from 'react'

import axios from 'axios'

import Register from './pages/Register'
import Home from './pages/Home'

import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'

import TaskBar from './pages/Tasks'

import PrivateRoute from './components/PrivateRouter'
import { LoadingSpinner } from './components/Loading'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Проверка токена: отправь запрос на `/me`
    axios.get('http://localhost:8000/users/me', { withCredentials: true })
      .then(() => {
        setIsAuthenticated(true)
        console.log('authenticated')
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setIsLoading(false))
     
  }, [])

  if (isLoading) {
    return (
      <div className="bg-black flex items-center flex-col gap-4 justify-center min-h-screen">
        <LoadingSpinner px = {48} />
        <div className="text-neutral-200 text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path = '/register' element = {<Register />}/>
      <Route path = '/' element = {<Home />}/>
      <Route path = '/login' element = {<Login />} />
      <Route
          path="/tasks"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} children={<TaskBar />}/>
          }
        />
    </Routes>
  )
}

export default App
