'use client'

import { useState } from 'react'
import FollowUpForm from './FollowUpForm'

interface FormData {
  name: string
  age: string
  gender: string
  occupation: string
  medicalHistory: string
  currentMedications: string
  allergies: string
  symptoms: string
  symptomDuration: string
  recentActivities: string
}

export default function AppointmentForm() {
  const [showFollowUp, setShowFollowUp] = useState(false)
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([])
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    gender: '',
    occupation: '',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    symptoms: '',
    symptomDuration: '',
    recentActivities: ''
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Initial Assessment</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Occupation</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Current Symptoms</label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Please describe your symptoms in detail"
          />
        </div>

        <div>
          <label className="block mb-1">How long have you had these symptoms?</label>
          <input
            type="text"
            name="symptomDuration"
            value={formData.symptomDuration}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="e.g., 2 days, 1 week"
          />
        </div>

        <div>
          <label className="block mb-1">Medical History</label>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Any previous conditions or surgeries"
          />
        </div>

        <div>
          <label className="block mb-1">Current Medications</label>
          <textarea
            name="currentMedications"
            value={formData.currentMedications}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={2}
            placeholder="List any medications you are currently taking"
          />
        </div>

        <div>
          <label className="block mb-1">Allergies</label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Any known allergies"
          />
        </div>

        <div>
          <label className="block mb-1">Recent Activities or Incidents</label>
          <textarea
            name="recentActivities"
            value={formData.recentActivities}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={2}
            placeholder="Any recent travel, injuries, or changes in routine"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit Initial Assessment
        </button>
      </div>
    </form>
  )
} 