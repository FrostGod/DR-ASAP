import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Generate follow-up questions based on symptoms
    const followUpQuestions = [
      "How severe is your pain on a scale of 1-10?",
      "Does anything make the symptoms better or worse?",
      "Have you experienced these symptoms before?",
      "Are your symptoms worse at any particular time of day?",
      "Have you made any changes to your diet or routine recently?"
    ]
    
    return NextResponse.json({ 
      success: true,
      followUpQuestions
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process initial assessment' },
      { status: 500 }
    )
  }
}