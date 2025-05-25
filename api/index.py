from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Load marks data once at startup
data_path = os.path.join(os.path.dirname(__file__), '..', 'data.json')
with open(data_path, 'r') as f:
    students = json.load(f)
marks_lookup = {entry["name"]: entry["marks"] for entry in students}

# Route must be mounted at "/api" since Vercel calls this path
@app.get("/api")
async def get_marks(request: Request):
    names = request.query_params.getlist("name")
    marks = [marks_lookup.get(name, None) for name in names]
    return JSONResponse(content={"marks": marks})
