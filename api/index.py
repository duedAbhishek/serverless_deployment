from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# Enable CORS for all origins and GET methods
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Load data.json
data_path = os.path.join(os.path.dirname(__file__), '..', 'data.json')
with open(data_path) as f:
    students = json.load(f)

# Create lookup dict
marks_dict = {s["name"]: s["marks"] for s in students}

@app.get("/")
async def get_marks(request: Request):
    names = request.query_params.getlist("name")
    result = [marks_dict.get(name, None) for name in names]
    return JSONResponse(content={"marks": result})
