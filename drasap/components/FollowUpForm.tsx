'use client'

import { useState } from 'react'

interface FollowUpFormProps {
  questions: string[]
  initialData: any
}

export default function FollowUpForm({ questions, initialData }: FollowUpFormProps) {
  const [answers, setAnswers] = useState<Record<string, string>>(
    Object.fromEntries(questions.map(q => [q, '']))
  )
  const [verdict, setVerdict] = useState<string>('')

  const handleChange = (question: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [question]: answer
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/final-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          initialData,
          followUpAnswers: answers
        }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setVerdict(data.verdict)
      }
    } catch (error) {
      console.error('Error submitting follow-up:', error)
      alert('There was an error processing your responses.')
    }
  }

  if (verdict) {
    return (
      <div className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
        <div className="border-b border-blue-100 pb-4">
          <h2 className="text-2xl font-semibold text-blue-900">Assessment Result</h2>
          <p className="text-blue-600 mt-1">Your appointment details and recommendations</p>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 rounded-md bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
            <p className="whitespace-pre-line text-gray-800">{verdict}</p>
          </div>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-500 text-white py-3 px-4 rounded-md hover:from-gray-700 hover:to-gray-600 transition-all duration-200 font-medium shadow-md"
          >
            Start New Assessment
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-100">
      <div className="border-b border-blue-100 pb-4">
        <h2 className="text-2xl font-semibold text-blue-900">Follow-up Questions</h2>
        <p className="text-blue-600 mt-1">Please provide additional details about your symptoms</p>
      </div>
      
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="form-group">
            <label className="block mb-2 text-sm font-medium text-gray-700">{question}</label>
            <textarea
              value={answers[question]}
              onChange={(e) => handleChange(question, e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={2}
            />
          </div>
        ))}
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
        >
          Get Assessment Results
        </button>
      </div>
    </form>
  )
}