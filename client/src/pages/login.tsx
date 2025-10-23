import { useActionState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()

  const [error, handleLogin, isPending] = useActionState(
    async(_prevState: string | null, formData: FormData): Promise<string | null> => {
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()
      
      if (!response.ok) {
        return result.error || 'Failed to log user in'
      }
      
      navigate('/')
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
            LOGIN
          </h1>
          <p className="text-purple-400 font-mono text-sm">
            WELCOME BACK
          </p>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        {/* Login Form */}
        <div className="retro-border bg-gray-900 p-8 rounded-lg">
            <form action={handleLogin} className="space-y-6">
                {/* Email */}
                <div>
                <label htmlFor="email" className="block text-purple-300 font-mono text-sm mb-2">
                    EMAIL
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-black text-white placeholder-purple-400 border border-purple-800 rounded focus:outline-none focus:border-purple-600 font-mono text-sm transition-colors duration-200"
                    placeholder="e.g. john.doe@example.com"
                    aria-label="Email"
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
                
                <button
                    type="submit"
                    disabled={isPending}
                    className="retro-button w-full py-3 text-base font-bold transition-all duration-200"
                >
                    LOGIN
                </button>
                
                {/* Register Link */}
                <div className="text-center text-purple-400 font-mono text-sm">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-white hover:underline">
                      Register
                  </Link>
                </div>
            </form>
        </div>    
    </div>
    </div>
  )
}

export default Login
