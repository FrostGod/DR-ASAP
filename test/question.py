import requests

BASE_URL = "http://127.0.0.1:8000"  # Update with your API's base URL if different

def test_question_api():
    """
    Test the /question API endpoint.
    """
    print("Testing /question API...")
    endpoint = f"{BASE_URL}/question"
    payload = {
        "message": "My name is Tony, 26 year-old, and I feel pain in shoulder"
    }

    response = requests.post(endpoint, json=payload)

    if response.status_code == 200:
        print("Response:", response.json())
        print("Test for /question API passed!\n")
    else:
        print("Test for /question API failed!")
        print("Status Code:", response.status_code)
        print("Details:", response.json())
        print()

def test_appointment_api():
    """
    Test the /appointment API endpoint.
    """
    print("Testing /appointment API...")
    endpoint = f"{BASE_URL}/appointment"
    payload = {
        "Priority": "B",
        "Hospital": "SF Hospital",
        "Doctor": "Dr. Wang",
        "Category": "PM&R"
    }

    response = requests.get(endpoint)#, json=payload)

    if response.status_code == 200:
        print("Response:", response.json())
        print("Test for /appointment API passed!\n")
    else:
        print("Test for /appointment API failed!")
        print("Status Code:", response.status_code)
        print("Details:", response.json())
        print()

if __name__ == "__main__":
    print("Starting API tests...\n")

    # Test /question API
    test_question_api()

    # Test /appointment API
    # test_appointment_api()

    print("API tests completed.")