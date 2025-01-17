'use client'

import { useState } from 'react'
import AppointmentForm from '@/components/AppointmentForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-8 text-center">DR ASAP - Medical Assistant</h1>
        <AppointmentForm />
      </div>
    </main>
  )
}
