import json
import os

def handler(request):
    # Enable CORS
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    }

    # Load JSON data
    file_path = os.path.join(os.path.dirname(__file__), '..', 'data.json')
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Parse query parameters
    names = request.get("query", {}).get("name", [])
    if isinstance(names, str):  # If only one name was passed
        names = [names]

    # Create a name-to-marks dictionary for fast lookup
    marks_lookup = {student["name"]: student["marks"] for student in data}
    result = [marks_lookup.get(name, None) for name in names]

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({ "marks": result })
    }
