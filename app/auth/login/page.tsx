// app/(auth)/login/page.tsx
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) {
        setError(signInError.message)
        setLoading(false)
        return
      }

      // on success, Supabase sets session in localStorage / cookie
      // you can navigate the user to a protected page
      router.push('/dashboard') // change to your protected route
    } catch (err: any) {
      setError(err?.message ?? 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const { data, error: magicError } = await supabase.auth.signInWithOtp({
        email
      })
      if (magicError) {
        setError(magicError.message)
        return
      }
      setError(null)
      alert('Check your email for a sign-in link (magic link).')
    } catch (err: any) {
      setError(err?.message ?? 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-md shadow">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>

      <form onSubmit={handleLogin} className="space-y-4">
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
            className="w-full border rounded px-3 py-2"
            placeholder="Your password"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 rounded bg-indigo-600 text-white disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <button
            type="button"
            onClick={handleMagicLink}
            disabled={loading || !email}
            className="py-2 px-4 rounded border"
          >
            Send magic link
          </button>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <p className="text-sm text-gray-600">
          No account yet? <a className="text-indigo-600" href="/auth/register">Register</a>
        </p>
      </form>
    </div>
  )
}
