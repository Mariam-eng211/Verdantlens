VerdantLens
Measuring ecosystem health beyond the surface.

 ##Inspiration & Overview
I built VerdantLens because I noticed how easily we are conditioned to equate surface-level "greenness" with true ecological health. If an urban park lawn or roadside thicket looks vibrant, it is easy to assume the ecosystem is thriving. However, visual color reveals nothing about soil compaction, microclimate stress, or whether a habitat actually supports diverse local biology.

To challenge this illusion, I engineered VerdantLens as a full-stack ecological monitoring platform. By fusing real-time IoT hardware telemetry with multimodal AI computer vision, I created a practical system that allows me—and other field researchers—to quantify ecosystem health using concrete environmental data rather than visual guesswork.

##Core Features
AI Field Vision Pipeline: I integrated Google Gemini 1.5 Flash to let users capture or upload macro and micro-features in nature (e.g., fallen deadwood, leaf litter, or wild patches). The vision model separates factual visual observations from ecological roles, rewarding discoveries with an interactive Nature XP system.

Live IoT Telemetry Probe: I custom-built and programmed an ESP32 hardware probe that samples real-time environmental data—air temperature, relative humidity, and soil moisture—streaming JSON payloads continuously over Wi-Fi.

Ask Nature Assistant: I developed a context-driven assistant that answers precise ecological questions directly tied to what is being tracked in the field.

Green vs. Alive Analytics: I designed a comparative module that contrasts manicured urban green spaces with genuine ecological patches to highlight microclimate divergences.

##System Architecture & Data Flow
I structured VerdantLens as a decoupled client-server application connecting physical microcontrollers, a backend routing server, a cloud database, and a mobile-first user interface:
[ESP32 Hardware Probe] --(HTTP POST / Wi-Fi)--> [Node.js / Express Backend]
                                                         │
[Mobile React Frontend] <---(REST / JSON)----------------┤
         │                                               ▼
         ├──(Multer Multipart Upload)-----> [Google Gemini 1.5 Flash AI]
         │                                               │
         └──(Real-time State / Telemetry)----> [Supabase PostgreSQL DB]
         
Telemetry Ingestion: My ESP32 firmware reads the DHT11 and capacitive soil moisture sensors, formatting readings into JSON payloads and pushing them via HTTP POST to my Express API.

Vision Processing: When an image is uploaded through the React frontend, multer handles memory storage before passing the image buffer to Gemini 1.5 Flash with strict JSON formatting constraints.

Cloud Synchronization: Supabase acts as the persistent relational layer, recording user XP gains, telemetry logs, and historical discovery records.

## Technical Stack & Engineering Decisions
Frontend
React & Vite: Chosen for fast hot-module replacement and a reactive single-page architecture optimized for mobile web browsers in field conditions.

Tailwind CSS: I styled the interface with a custom dark emerald theme (#0B1712) designed to minimize battery drain on OLED mobile displays and reduce outdoor glare.

Lucide React: Provides clean, lightweight vector icons for an intuitive field navigation layout.

##Backend & Database
Node.js & Express: Serves as the central API gateway handling CORS, multipart image uploads, and routing logic between the frontend and database.

Supabase (PostgreSQL): Manages relational data models, user profiles, and real-time data replication securely via environment-secured endpoints.

##AI & External APIs
Google Gemini 1.5 Flash (@google/genai): Powers computer vision image dissection and conversational context. I engineered rigorous system prompts to ensure the AI strictly separates observable physical features from hypothetical ecological functions, eliminating false species determinations.

Open-Meteo REST API: Supplies supplementary open-source meteorological tracking data to provide real-time ambient weather baselines.

##Hardware & Firmware
ESP32 dev module: Selected for its built-in Wi-Fi transceiver, dual-core processing capacity, and low power consumption profile during mobile prototyping.

C++ (Arduino Framework): Written in VS Code/Arduino IDE using DHT.h, HTTPClient.h, and ArduinoJson.h.

Sensors:

DHT11: Digital sensor measuring air temperature and relative humidity.

Capacitive Soil Moisture Sensor v1.2: Analog sensor wired to ADC1 (GPIO 34, which remains safe during Wi-Fi transmissions) and mapped against measured dry-air and water-submerged calibration voltages.

##Database Setup (Supabase SQL Schema)
I initialized my relational database using the following PostgreSQL schema:
-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT UNIQUE NOT NULL DEFAULT 'NatureExplorer',
    nature_xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. DISCOVERIES TABLE
CREATE TABLE discoveries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    feature_type TEXT NOT NULL,
    confidence REAL NOT NULL,
    observation TEXT NOT NULL,
    potential_roles JSONB NOT NULL,
    image_url TEXT,
    xp_awarded INTEGER DEFAULT 20,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. SENSOR_LOGS TABLE (ESP32 Telemetry)
CREATE TABLE sensor_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id TEXT NOT NULL DEFAULT 'ESP32_PROBE_01',
    temperature REAL NOT NULL,
    humidity REAL NOT NULL,
    soil_moisture REAL NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SEED DEMO USER PROFILE
INSERT INTO users (id, username, nature_xp, level)
VALUES ('00000000-0000-0000-0000-000000000001', 'Mariam_Eco', 0, 1)
ON CONFLICT DO NOTHING;

##Engineering Challenges & Solutions
Analog Sensor Calibration: Translating raw ADC voltage outputs from the capacitive soil moisture sensor required me to write dry-air and water-submerged calibration mapping scripts to establish reliable percentage bounds.

AI Hallucination Mitigation: To prevent the vision model from fabricating species names, I engineered strict JSON response boundaries in my Gemini system prompts, forcing the AI to separate objective visual observations from ecological roles.

Network Stability: I built graceful error-handling logic into my Node.js telemetry endpoints to maintain dashboard performance even when wireless packet transmission from the ESP32 breadboard experienced minor drops.

##Future Enhancements
Expanded Sensor Suite: Integrating PM2.5 air quality and light spectrum sensors into my ESP32 hardware build.

Acoustic Biodiversity Listening Node: Expand my ESP32 probe by adding a low-cost I2S digital microphone module (like the ICS-43434) to sample environmental soundscapes. I could write firmware routines to analyze ambient frequencies, detecting bird calls or insect activity to correlate sonic biodiversity with microclimate telemetry.

Pilot Deployments: Testing the hardware probe and web app setup in local school environments for ongoing habitat monitoring.

Plant Stress & Wilting Predictor: Combine historical time-series data from my Supabase telemetry logs (soil moisture and temperature trends) with Gemini vision scans of leaf structures to train a predictive heuristic. The system could forecast plant water stress or early blight before visible physical wilting occurs.

Collaborative Citizen Science Quests: Scale the Nature XP system into regional challenge boards where student groups or community members can collaborate to map ecological health metrics across different neighborhood zones.

Micro-Habitat Time Machine (Generative Aging): Build a feature where users scan a decomposing log or patch of disturbed soil, and use generative AI image transformation pipelines to simulate how that exact micro-feature will naturally break down, cycle nutrients, and support fungal growth over 3, 6, and 12 months.


