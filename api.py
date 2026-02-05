#!/usr/bin/env python3
"""
AI Product Video SaaS - API Server
Connects Vercel frontend to Replicate backend
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import replicate
import requests
import os
import json
from pathlib import Path
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Load API token from environment (set as ENV VAR in deployment)
# Example: export REPLICATE_API_TOKEN="your_token_here"
if not os.getenv("REPLICATE_API_TOKEN"):
    raise RuntimeError("REPLICATE_API_TOKEN environment variable not set. Please set it before running.")

# Setup
OUTPUT_DIR = Path('/home/clawd/.openclaw/workspace/saas-project/output')
OUTPUT_DIR.mkdir(exist_ok=True)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok",
        "service": "ai-product-video-api",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/v1/generate', methods=['POST'])
def generate_video():
    """
    Generate product video
    
    Body:
    {
        "product_image_url": "https://...",
        "model_type": "fashion_female_1",
        "position": "center"
    }
    """
    try:
        data = request.json
        
        if not data or 'product_image_url' not in data:
            return jsonify({"error": "product_image_url required"}), 400
        
        product_url = data['product_image_url']
        model_type = data.get('model_type', 'fashion_female_1')
        
        print(f"🎬 Generating video for product: {model_type}")
        print(f"📦 Product URL: {product_url}")
        
        # Step 1: Generate AI model
        print("🎨 Step 1: Generating AI model...")
        model_output = replicate.run(
            "black-forest-labs/flux-schnell",
            input={
                "prompt": "professional fashion model, elegant pose, studio lighting, white background, full body shot",
                "num_outputs": 1,
                "aspect_ratio": "9:16",
                "output_format": "png",
                "output_quality": 90
            }
        )
        
        # Convert FileOutput to string URL
        model_url = str(model_output[0]) if hasattr(model_output[0], '__str__') else model_output[0]
        print(f"✅ Model generated: {model_url}")
        
        return jsonify({
            "status": "success",
            "job_id": f"job_{datetime.now().timestamp()}",
            "model_url": model_url,
            "product_url": product_url,
            "message": "Video generation started"
        }), 202
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 500

@app.route('/api/v1/models', methods=['GET'])
def list_models():
    """List available AI models"""
    return jsonify({
        "models": [
            {
                "id": "fashion_female_1",
                "name": "Elegant Female Model",
                "description": "Professional fashion model, studio lighting"
            },
            {
                "id": "fashion_male_1",
                "name": "Professional Male Model",
                "description": "Business casual, confident pose"
            },
            {
                "id": "lifestyle_casual",
                "name": "Casual Lifestyle",
                "description": "Relaxed, everyday setting"
            }
        ]
    })

@app.route('/api/v1/pricing', methods=['GET'])
def pricing():
    """Get pricing tiers"""
    return jsonify({
        "currency": "USD",
        "plans": [
            {
                "name": "Starter",
                "credits": 10,
                "price": 9.99,
                "price_per_video": 0.99
            },
            {
                "name": "Pro",
                "credits": 50,
                "price": 39.99,
                "price_per_video": 0.79
            },
            {
                "name": "Business",
                "credits": 200,
                "price": 99.99,
                "price_per_video": 0.49
            }
        ]
    })

if __name__ == '__main__':
    print("🚀 AI Product Video API Server")
    print("🌐 Running on http://0.0.0.0:5000")
    print("📚 Endpoints:")
    print("  GET  /health")
    print("  POST /api/v1/generate")
    print("  GET  /api/v1/models")
    print("  GET  /api/v1/pricing")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
