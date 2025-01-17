'use client'

import { useState } from 'react'
import FollowUpForm from './FollowUpForm'

interface FormData {
  name: string
  age: string
  gender: string
  symptoms: string
  symptomDuration: string
  currentMedications: string
  allergies: string
}

export default function AppointmentForm() {
  const [showFollowUp, setShowFollowUp] = useState(false)
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([])
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    gender: '',
    symptoms: '',
    symptomDuration: '',
    currentMedications: '',
    allergies: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/initial-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        const data = await response.json()
        setFollowUpQuestions(data.followUpQuestions)
        setShowFollowUp(true)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error processing your information.')
    }
  }

  if (showFollowUp) {
    return <FollowUpForm questions={followUpQuestions} initialData={formData} />
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
      <div className="space-y-6">
        <div className="border-b border-blue-100 pb-4">
          <h2 className="text-2xl font-semibold text-blue-900">Initial Assessment</h2>
          <p className="text-blue-600 mt-1">Please provide your basic information and symptoms</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-blue-900">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/50"
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-blue-900">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full p-3 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/50"
              placeholder="Your age"
            />
          </div>

          <div className="form-group md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-blue-900">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-3 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/50"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-blue-900">What symptoms are you experiencing?</label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              required
              className="w-full p-3 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/50"
              rows={3}
              placeholder="Please describe your symptoms in detail"
            />
          </div>

          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-blue-900">How long have you had these symptoms?</label>
            <input
              type="text"
              name="symptomDuration"
              value={formData.symptomDuration}
              onChange={handleChange}
              required
              className="w-full p-3 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/50"
              placeholder="e.g., 2 days, 1 week"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-blue-900">Current Medications</label>
            <input
              type="text"
              name="currentMedications"
              value={formData.currentMedications}
              onChange={handleChange}
              className="w-full p-3 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/50"
              placeholder="List any medications you are currently taking"
            />
          </div>

          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-blue-900">Allergies</label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full p-3 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/50"
              placeholder="Any known allergies"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-md hover:from-blue-700 hover:to-blue-600 transition-all duration-200 font-medium shadow-md"
        >
          Continue to Follow-up Questions
        </button>
      </div>
    </form>
  )
} 