from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from typing import Optional, List, Dict
from openai import OpenAI

app = FastAPI()

# Initialize the OpenAI client
client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="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"
)

# Initialize conversation history
conversation_history = [
    {
        "role": "system",
        "content": (
            "You are an experienced and compassionate doctor. "
            "Your job is to listen to patients describing their symptoms and provide appropriate guidance. "
            "Ask at most one follow-up question to clarify symptoms when needed. "
            "Keep your responses professional, concise, and helpful."
            "For example: "
            "Patient, My name is Tony, 26 year-old, Male, I feel pain in should. "
            "Response: "
            "Which side? Did you work out? Do you feel it constantly or it comes and go?"
        )
    }
]

def invoke_llm(user_message: str) -> str:
    """
    Call NVIDIA LLM API to get a response to the user's message.
    
    Args:
        user_message (str): The input message from the user.
        
    Returns:
        str: The LLM's response.
    """
    # Append the user's message to conversation history
    conversation_history.append({"role": "user", "content": user_message})

    try:
        print(conversation_history)
        # Call NVIDIA LLM API with the current conversation history
        completion = client.chat.completions.create(
            model="nvidia/llama-3.1-nemotron-70b-instruct",
            messages=conversation_history,
            temperature=0.5,
            top_p=1,
            max_tokens=512,
            stream=True
        )
        
        # Build the response incrementally as it streams
        response_content = ""
        for chunk in completion:
            if chunk.choices[0].delta.content is not None:
                response_content += chunk.choices[0].delta.content
        
        # Append the model's response to conversation history
        conversation_history.append({"role": "assistant", "content": response_content})
        
        return response_content
    except Exception as e:
        raise RuntimeError(f"Error occurred while communicating with LLM: {e}")

@app.post("/question")
async def ask_question(request: Dict):
    """
    Accepts a question from the user and gets an answer from the LLM.
    
    Args:
        request (Dict): JSON body containing the user message.
        
    Returns:
        Dict: The LLM's response.
    """
    try:
        user_message = request.get("message", "")
        if not user_message:
            raise ValueError("Message is required.")
        
        # Call invoke_llm with the user's message
        llm_response = invoke_llm(user_message)
        return {"response": llm_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/appointment")
async def book_appointment():
    try:
        # appointment_data = appointment.dict()
        # Assuming further processing might occur, return the appointment details
        return {"status": "Appointment booked", "Priority": "B", "Location": "SF Clinic", "Doctor": "Dr.Jenson", "Category": "PM&R", "details": "appointment_data"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while booking the appointment.")