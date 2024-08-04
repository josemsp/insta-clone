import Image from "@/components/image"
import Input from "@/components/Input"
import { IMAGE_PUBLIC_PATH } from "@/constants/paths"
import ROUTES from "@/constants/routes"
import { useUserStore } from "@/hooks/use-user-store"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const { login, loading, error } = useUserStore()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Login - Insta Clone'
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password);
      navigate(ROUTES.DASHBOARD)
    } catch (error) {
      setEmail('');
      setPassword('');
    }
  }

  const handleEmailChange = (value: string) => setEmail(value)

  const handlePasswordChange = (value: string) => setPassword(value)

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <Image src={IMAGE_PUBLIC_PATH('iphone-with-profile.jpg')} alt="iPhone with Insta App" />
      </div>
      <div className="flex flex-col w-2/5">

        <div className="flex flex-col items-center bg-white p-4 border border-gray-300 mb-3">

          <h1 className="flex justify-center w-full mt-3 mb-6">
            <Image src={IMAGE_PUBLIC_PATH('logo.png')} alt="Insta Clone" />
          </h1>

          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}

          <form onSubmit={handleLogin} method="POST" className="flex flex-col gap-5 w-full">
            <Input
              aria-label="Enter your email address"
              type="email"
              autoComplete='email'
              placeholder="Email address"
              className="text-sm text-gray-500 w-full py-5 px-4 h-2 border border-gray-300 rounded"
              onChange={handleEmailChange}
              value={email}
            />
            <Input
              aria-label="Enter your password"
              type="password"
              autoComplete='new-password'
              placeholder="Password"
              className="text-sm text-gray-500 w-full py-5 px-4 h-2 border border-gray-300 rounded"
              onChange={handlePasswordChange}
              value={password}
            />
            <button disabled={loading} className="bg-blue-500 text-white rounded block w-full h-9 disabled:opacity-70">
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

        </div>

        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-300">
          <p className="text-sm">Don't have an account?
            <Link to={ROUTES.SIGN_UP} className="ml-2 font-bold text-blue-500">Sign Up</Link>
          </p>
        </div>

      </div>

    </div >
  )
}

export default Login