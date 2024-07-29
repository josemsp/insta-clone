import Image from "@/components/image"
import Input from "@/components/Input"
import { IMAGE_PUBLIC_PATH } from "@/constants/paths"
import ROUTES from "@/constants/routes"
import { getUserByEmail, getUserByUsername, signUp } from "@/services/firebase"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Sign Up - Insta Clone'
  }, [])

  const handleSignUp = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      setLoading(true)

      const [userEmail, userUsername] = await Promise.all([
        getUserByEmail({ email }),
        getUserByUsername({ username }),
      ])

      if (userEmail) {
        setEmail('');
        setError('That email is already taken, please try another.');
      } else if (userUsername) {
        setUsername('');
        setError('That username is already taken, please try another.');
      } else {
        await signUp({ username, fullName, email, password });
        navigate(ROUTES.DASHBOARD)
      }
    } catch (error) {
      setUsername('')
      setFullName('')
      setEmail('')
      setPassword('')
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleUsernameChange = (value: string) => setUsername(value)
  const handleFullNameChange = (value: string) => setFullName(value)
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

          <form onSubmit={handleSignUp} method="POST" className="flex flex-col gap-5 w-full">
            <Input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-500 w-full py-5 px-4 h-2 border border-gray-300 rounded"
              onChange={handleUsernameChange}
              value={username}
            />
            <Input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray-500 w-full py-5 px-4 h-2 border border-gray-300 rounded"
              onChange={handleFullNameChange}
              value={fullName}
            />
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
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>

        </div>

        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-300">
          <p className="text-sm">Have an account?
            <Link to={ROUTES.LOGIN} className="ml-2 font-bold text-blue-500">Log In</Link>
          </p>
        </div>

      </div>
    </div >
  )
}

export default SignUp