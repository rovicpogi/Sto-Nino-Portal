// app/(auth)/register/page.tsx
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      // sign up with email and password
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        // optionally send additional user metadata
        options: {
          data: { role: 'student' } // change role as needed
        }
      })

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      // If you use email confirmations, Supabase will send an email.
      setMessage(
        'Registration successful. Check your email to confirm (if email confirmation is enabled).'
      )

      // optionally redirect after a short delay or immediately
      setTimeout(() => {
        router.push('/(auth)/login') // or wherever you want
      }, 1500)
    } catch (err: any) {
      setError(err?.message ?? 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-md shadow">
      <h1 className="text-2xl font-semibold mb-4">Create an account</h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="w-full border rounded px-3 py-2"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            minLength={6}
            className="w-full border rounded px-3 py-2"
            placeholder="At least 6 characters"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded bg-indigo-600 text-white disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </div>

        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}

        <p className="text-sm text-gray-600">
          Already have an account? <a className="text-indigo-600" href="/(auth)/login">Sign in</a>
        </p>
      </form>
    </div>
  )
}
