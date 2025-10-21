import { useActionState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  
  const [error, handleRegister, isPending] = useActionState(
    async(_prevState: string | null, formData: FormData): Promise<string | null> => {
      const name = formData.get('name') as string
      const email = formData.get('email') as string
      const username = formData.get('username') as string
      const password = formData.get('password') as string
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, username, password }),
      })

      const result = await response.json()
      
      if (!response.ok) {
        return result.error || 'Failed to register user'
      }
      
      console.log(result.data)
      return null
    }, 
    null
  )

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded flex items-center justify-center">
              <span className="font-pixel text-sm text-white">GC</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold retro-text font-pixel mb-2">
            CREATE ACCOUNT
          </h1>
          <p className="text-purple-400 font-mono text-sm">
            JOIN THE RETRO ARCADE
          </p>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Registration Form */}
        <div className="retro-border bg-gray-900 p-8 rounded-lg">
          <form action={handleRegister} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-purple-300 font-mono text-sm mb-2">
                FULL NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-black text-white placeholder-purple-400 border border-purple-800 rounded focus:outline-none focus:border-purple-600 font-mono text-sm transition-colors duration-200"
                placeholder="e.g. John Doe"
                aria-label="Full name"
                aria-required="true"
                aria-disabled={isPending}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-purple-300 font-mono text-sm mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="text"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-black text-white placeholder-purple-400 border border-purple-800 rounded focus:outline-none focus:border-purple-600 font-mono text-sm transition-colors duration-200"
                placeholder="e.g. john.doe@example.com"
                aria-label="Email address"
                aria-required="true"
                aria-disabled={isPending}
              />
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-purple-300 font-mono text-sm mb-2">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full px-4 py-3 bg-black text-white placeholder-purple-400 border border-purple-800 rounded focus:outline-none focus:border-purple-600 font-mono text-sm transition-colors duration-200"
                placeholder="e.g. johndoe123"
                aria-label="Username"
                aria-required="true"
                aria-disabled={isPending}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-purple-300 font-mono text-sm mb-2">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 bg-black text-white placeholder-purple-400 border border-purple-800 rounded focus:outline-none focus:border-purple-600 font-mono text-sm transition-colors duration-200"
                placeholder="********"
                aria-label="Password"
                aria-required="true"
                aria-disabled={isPending}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="retro-button w-full py-3 text-base font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Register"
              aria-disabled={isPending}
              disabled={isPending}
            >
              {isPending ? 'Registering...' : 'REGISTER'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-purple-400 font-mono text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-purple-300 hover:text-purple-100 underline transition-colors duration-200"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register