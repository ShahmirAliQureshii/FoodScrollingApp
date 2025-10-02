import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import '../styles/error.css'

export default function ErrorPage() {
  const error = useRouteError?.() ?? {}
  const status = error?.status ?? 404
  const message = error?.statusText ?? error?.message ?? 'The page you are looking for cannot be found.'

  return (
    <main className="err-wrap" role="alert" aria-live="polite">
      <div className="err-card">
        <div className="err-visual" aria-hidden>
          <svg viewBox="0 0 120 120" className="err-ring" width="120" height="120" xmlns="http://www.w3.org/2000/svg" fill="none">
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" stopColor="var(--accent)" stopOpacity="0.95"/>
                <stop offset="1" stopColor="var(--accent)" stopOpacity="0.55"/>
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="46" stroke="url(#g)" strokeWidth="8" strokeLinecap="round" />
            <path d="M40 40 L80 80 M80 40 L40 80" stroke="rgba(255,255,255,0.85)" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>

        <div className="err-content">
          <div className="err-top">
            <h1 className="err-code">{status}</h1>
            <h2 className="err-title">Something went wrong</h2>
          </div>

          <p className="err-msg">{message}</p>

          <div className="err-actions">
            <Link className="btn" to="/">Go home</Link>
            <a className="btn ghost" href="mailto:support@example.com">Contact support</a>
          </div>

          <p className="err-foot">Try refreshing, or return to the home page.</p>
        </div>
      </div>
    </main>
  )
}