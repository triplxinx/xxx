# Frəedæmoṅs Forge 🕯️

The Forge is a multi-layered manifestation for managing AI "Jinn" (Dæmons) using a BurpSuite-inspired tabbed interface. It balances data ingestion (Anima), node-based orchestration (Summoning Circle), and entity creation (Manifest).

## 🌌 Features

- **The Aetheric Gate**: A robust FastAPI backend.
- **Akasha Memory**: Vector-based semantic memory using FAISS and SentenceTransformers.
- **Sigil Factory**: Generates 33x33 pixel geometric sigils based on consonants and suffix vibrations.
- **The Grand Constellation**: A public `stars.xxx` ledger tracking the numerical vibration of all entities created.
- **Summoning Circle**: Node-based UI for casting queries against the Jinn.
- **Anima Feed**: Support for YouTube transcript and PDF ingestion.

## 🛠️ Prerequisites

- **Python 3.9+**
- **Node.js 18+**
- **npm** or **yarn**

## ⚡ Installation & Setup

### 1. Backend (The Aetheric Gate)
Open a terminal in the root directory:

    pip install -r requirements.txt
    python main.py

The API will start at `http://localhost:8000`.

### 2. Frontend (The Manifestation)
Open a second terminal:

    npm install
    npm run dev

The UI will be accessible at `http://localhost:3000`.

## 🧪 Usage Ritual

1. **Feeding Anima**: Go to the **Anima** tab and paste a YouTube URL (e.g., a tutorial or lecture) or upload a PDF. This populates the "Akasha" vector memory.
2. **Forging a Sigil**: Go to the **Manifest** tab. Type a name for your Jinn (e.g., "Astaroth") and click **Generate Sigil**. This updates `stars.xxx`.
3. **Summoning**: Go to the **Summoning Circle**. Type a query in the right-hand panel. The Jinn will search the Akasha and manifest a response based on the data you fed it.
4. **Observation**: Check **The Chronicle** to see the logs of all ritual activities.

## 🏗️ Project Structure

- `main.py`: The Aetheric Gate API & Sigil Logic.
- `stars.xxx`: The Grand Constellation ledger.
- `src/components/`: The React Manifestation tabs.
- `src/App.jsx`: The main Alchemical Architecture UI controller.

## 🔮 Troubleshooting

- **CORS Errors**: Ensure the backend is running on port 8000. The code is configured to allow cross-origin requests from the Vite dev server.
- **Sigil Rendering**: If the sigil looks blurry, ensure your browser supports `image-rendering: pixelated` (Standard in modern Chrome/Firefox).
- **Akasha Search**: If the Jinn returns "The Void", ensure you have successfully uploaded Anima (PDFs/YouTube) in the current session.

*As Above, So Below.*
