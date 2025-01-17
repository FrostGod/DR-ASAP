'use client'

import { useState } from 'react'
import AppointmentForm from '@/components/AppointmentForm'
import Logo from '@/components/Logo'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Logo />
        </div>
        <AppointmentForm />
      </div>
    </main>
  )
}
