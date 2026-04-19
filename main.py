import os
import re
import json
import base64
from typing import List, Optional
from io import BytesIO
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image, ImageDraw
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
from youtube_transcript_api import YouTubeTranscriptApi
import PyPDF2

# --- Initialization ---
app = FastAPI(title="Frəedæmoṅs Forge")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Constants
STARS_FILE = "stars.xxx"
DATA_DIR = "forge_data"
SIGIL_SIZE = 33

if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)
if not os.path.exists(STARS_FILE):
    with open(STARS_FILE, "w") as f:
        f.write("")

# Embedding Model (The Engine of Akasha)
# Note: Using a small model for speed and portability
model = SentenceTransformer('all-MiniLM-L6-v2')
dimension = 384
index = faiss.IndexFlatL2(dimension)
knowledge_base = []

# --- Models ---
class SummonRequest(BaseModel):
    name: str
    query: str

class SigilResponse(BaseModel):
    name: str
    points: int
    image_b64: str

# --- Sigil Factory Logic ---
def calculate_vibration(name: str) -> int:
    consonants = re.findall(r'[bcdfghjklmnpqrstvwxyz]', name.lower())
    return len(consonants) + 3 # Trinity of the Suffix

def generate_sigil_image(points: int) -> str:
    img = Image.new('L', (SIGIL_SIZE, SIGIL_SIZE), 0)
    draw = ImageDraw.Draw(img)
    center = SIGIL_SIZE // 2
    radius = (SIGIL_SIZE // 2) - 2
    
    if points < 3: points = 3
    
    # Draw Geometric Star
    angles = np.linspace(0, 2 * np.pi, points, endpoint=False)
    points_list = []
    for i, angle in enumerate(angles):
        # Create star effect by alternating radii
        r = radius if i % 2 == 0 else radius // 2
        x = center + r * np.cos(angle)
        y = center + r * np.sin(angle)
        points_list.append((x, y))
    
    if len(points_list) > 2:
        draw.polygon(points_list, outline=255, fill=0)
    
    # Draw outer circle
    draw.ellipse([2, 2, SIGIL_SIZE-3, SIGIL_SIZE-3], outline=255)
    
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode()

# --- Routes ---

@app.get("/api/constellation")
async def get_constellation():
    if not os.path.exists(STARS_FILE):
        return {"constellation": ""}
    with open(STARS_FILE, "r") as f:
        content = f.read()
    return {"constellation": content}

@app.post("/api/anima/url")
async def ingest_url(url: str = Form(...)):
    # Simple YouTube ingestion
    try:
        video_id = None
        if "youtube.com" in url:
            video_id = url.split("v=")[1].split("&")[0]
        elif "youtu.be" in url:
            video_id = url.split("/")[-1]
            
        if video_id:
            transcript = YouTubeTranscriptApi.get_transcript(video_id)
            text = " ".join([t['text'] for t in transcript])
            
            # Embed and add to Akasha
            vector = model.encode([text])
            index.add(np.array(vector).astype('float32'))
            knowledge_base.append({"source": url, "content": text[:500] + "..."})
            
            return {"status": "success", "message": f"Anima consumed YouTube essence: {video_id}"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    return {"status": "error", "message": "Only YouTube URLs currently supported for Anima"}

@app.post("/api/anima/pdf")
async def ingest_pdf(file: UploadFile = File(...)):
    try:
        pdf_reader = PyPDF2.PdfReader(file.file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
            
        vector = model.encode([text])
        index.add(np.array(vector).astype('float32'))
        knowledge_base.append({"source": file.filename, "content": text[:500] + "..."})
        
        return {"status": "success", "filename": file.filename}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/forge/sigil", response_model=SigilResponse)
async def forge_sigil(name: str = Form(...)):
    vibration = calculate_vibration(name)
    img_b64 = generate_sigil_image(vibration)
    
    # Update Grand Constellation
    with open(STARS_FILE, "a") as f:
        f.write(f"{vibration}xxx")
        
    return {
        "name": name,
        "points": vibration,
        "image_b64": img_b64
    }

@app.post("/api/summon")
async def summon_jinn(req: SummonRequest):
    # Perform Vector Search in Akasha
    query_vector = model.encode([req.query])
    D, I = index.search(np.array(query_vector).astype('float32'), k=1)
    
    context = "No specific knowledge found in Akasha."
    source = "The Void"
    
    if len(knowledge_base) > 0 and I[0][0] != -1:
        match = knowledge_base[I[0][0]]
        context = match['content']
        source = match['source']

    # Mock Jinn Response (In production, connect to OpenAI/Anthropic/Local LLM here)
    # Using the context derived from Akasha
    response = f"I have peered into the Akasha. Regarding '{req.query}', the scrolls of {source} reveal: {context[:200]}..."
    
    return {
        "jinn_name": req.name,
        "response": response,
        "source": source,
        "timestamp": "Ritual complete"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
