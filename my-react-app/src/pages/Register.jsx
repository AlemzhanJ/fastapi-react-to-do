import axios from 'axios'
import { useState } from 'react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'
import { LoadingSpinner } from '../components/Loading'

const backendUrl = import.meta.env.VITE_BACKEND_URL

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailTouched, setIsEmailTouched] = useState(false)
  const [isPasswordTouched, setIsPasswordTouched] = useState(false)
  const navigate = useNavigate()
  const emailRegEx = /^[^@\s\.]+@[^@\s\.]+\.[^@\s\.]+$/
  const [errorMessage, setErrorMessage] = useState('')

  const [loading, setIsLoading] = useState(false)

  const invalidEmailError = useMemo(() => {
    if (!email){
      return 'Please enter your email.'
    }

    if (!emailRegEx.test(email)){
      return 'Pleace enter a valid email.'
    }

    return ''
  }, [email])

  const invalidPasswordError = useMemo(() => {
    if (!password){
      return 'Please enter your password.'
    }

    if (password.length < 8){
      return 'Password must be at least 8 characters long.'
    }

    return ''
  }, [password])

  const submitForm = async () => {

    setIsEmailTouched(true)
    setIsPasswordTouched(true)

    if (invalidEmailError || invalidPasswordError){
      return
    }



    try{
      setIsLoading(true)
      const res = await axios.post(`${backendUrl}/users/register`, {
        email,
        password
      }, {withCredentials: true})
      
      // Попробуем navigate, если не сработает - используем window.location
      try {
        setTimeout(() => {
          navigate('/tasks')
        }, 100)
      } catch (navError) {
        console.log('Navigate failed, using window.location:', navError)
        window.location.href = '/tasks'
      }
      
      console.log(`Created: ${JSON.stringify(res.data)}`)

    } catch(err){
      setIsLoading(false)
      const msg = err?.response?.data?.detail
      setErrorMessage(msg)
    }
  }

  return (
    <main className = 'bg-black flex items-center justify-center min-h-screen p-2'>
      <form className = 'p-6 w-full max-w-xl flex flex-col gap-4 bg-neutral-900 border border-neutral-800 rounded-lg'
            onSubmit={e => {
              e.preventDefault()
              submitForm()
              }
            }
            >

        
        <h1 className = 'text-neutral-200 text-2xl tracking-wide font-semibold '>Sign up</h1>

        <section className = 'flex flex-col gap-1'>
          <div className = 'flex justify-between'>
            <label className = 'text-neutral-300 text-sm'
                   htmlFor = 'email'>
              Your email:
            </label>
            {invalidEmailError && isEmailTouched && (
            <span className='text-red-400 text-sm'>{invalidEmailError}</span>
            )}
          </div>
          <input className = 'p-1 text-neutral-200 border border-neutral-700 outline-none focus:border-neutral-600 rounded-md w-full' 
                 type = 'email' 
                 onChange = {e => setEmail(e.target.value)} 
                 id = 'email' 
                 placeholder = 'example@mail.com'
                 onBlur = {() => setIsEmailTouched(true)}
                 required />
        </section>


        <section className = 'flex flex-col gap-1'>
          <div className = 'flex justify-between'>
            <label className = 'text-neutral-300 text-sm'
                   htmlFor = 'password'>
              Your password:
            </label>
            {invalidPasswordError && isPasswordTouched && (
            <span className='text-red-400 text-sm'>{invalidPasswordError}</span>
            )}

          </div>
          <input className = 'p-1 text-neutral-200 border border-neutral-700 outline-none focus:border-neutral-600 rounded-md w-full' 
                 type = 'password' 
                 onChange = {e => setPassword(e.target.value)} 
                 id = 'password'
                 placeholder = '••••••••' 
                 onBlur = {() => setIsPasswordTouched(true)}
                 required />
        </section>
        {
          errorMessage &&
          <div className = 'w-full flex justify-center items-center text-red-400'>
            {errorMessage}
          </div>
        }
        {!loading 
          ? <input type = 'submit'
               className = 'py-3 w-full rounded-lg flex justify-center items-center bg-neutral-200 text-neutral-900 hover:bg-neutral-300'
               value = 'Sign up' 
            />
          : (
              <div className = 'w-full flex justify-center items-center py-3 mt-4'>
                <LoadingSpinner px = {24} />
              </div>
            )
        }

        <div className = 'flex justify-center flex-row gap-2 w-full text-sm text-neutral-200'>
            <span>Have an account?</span><Link to = '/login' className= 'underline hover:text-white hover:underline'>Log in</Link>
        </div>
      </form>
    </main>
  )
}

export default Register
