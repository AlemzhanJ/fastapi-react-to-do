import axios from 'axios'
import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../components/Loading'

const backendUrl = import.meta.env.VITE_BACKEND_URL

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailTouched, setIsEmailTouched] = useState(false)
  const [isPasswordTouched, setIsPasswordTouched] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const navigate = useNavigate()
  const [loading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')


  const emailRegEx = /^[^@\s\.]+@[^@\s\.]+\.[^@\s\.]+$/

  const invalidEmailError = useMemo(() => {
    if (!email) return 'Please enter your email.'
    if (!emailRegEx.test(email)) return 'Please enter a valid email.'
    return ''
  }, [email])

  const invalidPasswordError = useMemo(() => {
    if (!password) return 'Please enter your password.'
    return ''
  }, [password])

  const submitForm = async () => {
    setIsEmailTouched(true)
    setIsPasswordTouched(true)

    if (invalidEmailError || invalidPasswordError) {
      return
    }
    setIsLoading(true)
    try {
      const res = await axios.post(
        `${backendUrl}/users/login`,
        { email, password },             // body
        { withCredentials: true }        // axios-config
      )
      console.log(`Login: ${JSON.stringify(res.data)}`)
      
      // Попробуем navigate, если не сработает - используем window.location
      try {
        // Небольшая задержка для мобильных устройств
        setTimeout(() => {
          navigate('/tasks')
        }, 100)
      } catch (navError) {
        console.log('Navigate failed, using window.location:', navError)
        window.location.href = '/tasks'
      }
    } catch(err){
      setIsLoading(false)
      const msg = err?.response?.data?.detail
      setErrorMessage(msg)
    }
  }

  return (
    <main className='bg-black flex items-center justify-center min-h-screen p-2'>
      <form
        className='p-6 w-full max-w-xl flex flex-col gap-4 bg-neutral-900 border border-neutral-800 rounded-lg'
        onSubmit={(e) => {
          e.preventDefault()
          submitForm()
        }}
      >
        <h1 className='text-neutral-200 text-2xl tracking-wide font-semibold'>Log in</h1>

        {/* Email */}
        <section className='flex flex-col gap-1'>
          <div className='flex justify-between'>
            <label htmlFor='email' className='text-neutral-300 text-sm'>
              Your email:
            </label>
            {invalidEmailError && isEmailTouched && (
              <span className='text-red-400 text-sm'>{invalidEmailError}</span>
            )}
          </div>
          <input
            id='email'
            type='email'
            placeholder='example@mail.com'
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setIsEmailTouched(true)}
            className='p-1 text-neutral-200 border border-neutral-700 outline-none focus:border-neutral-600 rounded-md w-full'
            required
          />
        </section>

        {/* Password */}
        <section className='flex flex-col gap-1'>
          <div className='flex justify-between'>
            <label htmlFor='password' className='text-neutral-300 text-sm'>
              Your password:
            </label>
            {invalidPasswordError && isPasswordTouched && (
              <span className='text-red-400 text-sm'>{invalidPasswordError}</span>
            )}
          </div>
          <input
            id='password'
            type='password'
            placeholder='••••••••'
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setIsPasswordTouched(true)}
            className='p-1 text-neutral-200 border border-neutral-700 outline-none focus:border-neutral-600 rounded-md w-full'
            required
          />

          {forgotPassword ? (<span className = 'text-neutral-200 text-sm'>Oops... no password recovery here. Just start fresh!</span>) : (<button className = 'underline text-neutral-200 hover:text-white flex justify-start text-sm' type = 'button' onClick = {() => setForgotPassword(true)}>Forgot your password?</button>) }
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
               value = 'Log in' 
            />
          : (
              <div className = 'w-full flex justify-center items-center py-3 mt-4'>
                <LoadingSpinner px = {24} />
              </div>
            )
        }

        <div className = 'flex flex-row justify-center w-full text-sm text-neutral-200 gap-2'>
            <span>Don't have an account?</span><Link to = '/register' className= 'underline hover:text-white hover:underline'>Sign Up</Link>
        </div>
      </form>
    </main>
  )
}

export default Login
