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
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Assessment Result</h2>
        <div className="p-4 border rounded bg-blue-50">
          <p className="font-medium whitespace-pre-line">{verdict}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Start New Assessment
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Follow-up Questions</h2>
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={index}>
            <label className="block mb-1">{question}</label>
            <textarea
              value={answers[question]}
              onChange={(e) => handleChange(question, e.target.value)}
              required
              className="w-full p-2 border rounded"
              rows={2}
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit Follow-up Responses
        </button>
      </div>
    </form>
  )
}