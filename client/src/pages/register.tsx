import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Registration form submitted:', formData)
  }

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
        </div>

        {/* Registration Form */}
        <div className="retro-border bg-gray-900 p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-purple-300 font-mono text-sm mb-2">
                FULL NAME
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-black text-white placeholder-purple-400 border border-purple-800 rounded focus:outline-none focus:border-purple-600 font-mono text-sm transition-colors duration-200"
                placeholder="Enter your full name"
                aria-label="Full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-purple-300 font-mono text-sm mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-black text-white placeholder-purple-400 border border-purple-800 rounded focus:outline-none focus:border-purple-600 font-mono text-sm transition-colors duration-200"
                placeholder="Enter your email"
                aria-label="Email address"
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
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-black text-white placeholder-purple-400 border border-purple-800 rounded focus:outline-none focus:border-purple-600 font-mono text-sm transition-colors duration-200"
                placeholder="Choose a username"
                aria-label="Username"
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
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-black text-white placeholder-purple-400 border border-purple-800 rounded focus:outline-none focus:border-purple-600 font-mono text-sm transition-colors duration-200"
                placeholder="Create a password"
                aria-label="Password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="retro-button w-full py-3 text-base font-bold transition-all duration-200"
            >
              REGISTER
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