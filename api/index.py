# api/index.py
import json
import os
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# ✅ Enable CORS — allows any website/dashboard to call this endpoint
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # any origin
    allow_methods=["*"],       # GET, POST, etc.
    allow_headers=["*"],
)

# Load the telemetry data once when the function starts
DATA_PATH = os.path.join(os.path.dirname(__file__), "latency.json")
with open(DATA_PATH) as f:
    RAW_DATA = json.load(f)

# Define what the incoming POST body looks like
class AnalyticsRequest(BaseModel):
    regions: List[str]
    threshold_ms: float

@app.post("/analytics")
def analytics(req: AnalyticsRequest):
    results = {}

    for region in req.regions:
        # Filter rows that belong to this region
        records = [r for r in RAW_DATA if r["region"] == region]

        if not records:
            results[region] = None
            continue

        latencies = [r["latency_ms"] for r in records]
        uptimes   = [r["uptime"] for r in records]

        results[region] = {
            "avg_latency": round(float(np.mean(latencies)), 4),
            "p95_latency": round(float(np.percentile(latencies, 95)), 4),
            "avg_uptime":  round(float(np.mean(uptimes)), 4),
            "breaches":    int(sum(1 for l in latencies if l > req.threshold_ms)),
        }

    return results