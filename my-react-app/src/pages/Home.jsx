import { Link } from "react-router-dom"
import { PrimaryButton } from "../components/Buttons"

function Home() {
  return (
    <div className="min-h-screen bg-black text-neutral-200 flex flex-col">
      
      {/* Шапка */}
      <header className="w-full border-b border-neutral-800 bg-black">
        <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-semibold">Do it</span>
          <ul className="flex gap-6 text-sm">
            <li>
              <Link to="/register" className="hover:text-white hover:underline">
                Sign up
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white hover:underline">
                Log in
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Главная секция */}
      <main className="flex-grow flex items-center justify-center text-center px-4">
        <div className="flex flex-col gap-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-wide">
            <span className = 'bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 bg-clip-text text-transparent'>Revolutionizing</span> To Do Apps
          </h1>
          <p className="text-neutral-400 text-lg">
            AI-powered SaaS that builds your productivity.
          </p>
          <Link to="/login" className="self-center w-full max-w-xs">
            <PrimaryButton text="Start now" />
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Home
