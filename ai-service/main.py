#!/usr/bin/env python3
"""
AI Review Analysis Service
FastAPI application for sentiment analysis and issue detection in parking reviews.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from textblob import TextBlob
from datetime import datetime
import logging
import re
from typing import Optional

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Parking Review AI Service",
    description="Sentiment analysis and issue detection for parking reviews",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== REQUEST/RESPONSE MODELS ====================

class ReviewAnalysisRequest(BaseModel):
    """Request model for review analysis"""
    text: str
    
    class Config:
        schema_extra = {
            "example": {
                "text": "Parking was dirty and unsafe at night"
            }
        }


class ReviewAnalysisResponse(BaseModel):
    """Response model for review analysis"""
    sentiment_label: str  # POSITIVE, NEUTRAL, NEGATIVE
    sentiment_score: float  # 0.0 to 1.0
    security_flag: bool
    cleanliness_flag: bool
    analyzed_at: str
    
    class Config:
        schema_extra = {
            "example": {
                "sentiment_label": "NEGATIVE",
                "sentiment_score": 0.82,
                "security_flag": True,
                "cleanliness_flag": True,
                "analyzed_at": "2025-04-18T10:30:00"
            }
        }


class HealthCheckResponse(BaseModel):
    """Health check response"""
    status: str
    timestamp: str


# ==================== KEYWORD DETECTION ====================

SECURITY_KEYWORDS = {
    'unsafe', 'theft', 'dark', 'no guard', 'robbery', 'cctv', 'insecure',
    'dangerous', 'attack', 'stolen', 'break-in', 'vandalism', 'security',
    'guard', 'camera', 'protection', 'risk', 'threat', 'crime', 'police',
    'emergency', 'help needed', 'unsafe area', 'bad neighborhood'
}

CLEANLINESS_KEYWORDS = {
    'dirty', 'smell', 'garbage', 'messy', 'dust', 'unhygienic',
    'clean', 'filthy', 'trash', 'waste', 'litter', 'unclean',
    'odor', 'stink', 'debris', 'stain', 'mud', 'wet', 'puddle',
    'broken', 'damage', 'maintenance'
}


def detect_keywords(text: str, keywords: set) -> bool:
    """
    Detect if any keyword from the set appears in text.
    Case-insensitive and works with word boundaries.
    """
    text_lower = text.lower()
    for keyword in keywords:
        if re.search(r'\b' + re.escape(keyword) + r'\b', text_lower):
            return True
    return False


def analyze_sentiment(text: str) -> tuple[str, float]:
    """
    Analyze sentiment using TextBlob.
    
    Returns:
        tuple: (sentiment_label: str, polarity: float)
        
    Polarity:
        -1.0 to -0.1 = NEGATIVE
         -0.1 to 0.1 = NEUTRAL
         0.1 to 1.0 = POSITIVE
    """
    try:
        blob = TextBlob(text)
        polarity = blob.sentiment.polarity
        
        # Determine sentiment label
        if polarity < -0.1:
            sentiment_label = "NEGATIVE"
            # Normalize score to 0-1 range (higher = more negative)
            sentiment_score = abs(polarity)
        elif polarity > 0.1:
            sentiment_label = "POSITIVE"
            sentiment_score = abs(polarity)
        else:
            sentiment_label = "NEUTRAL"
            sentiment_score = 0.5  # Middle value for neutral
            
        return sentiment_label, round(sentiment_score, 3)
    
    except Exception as e:
        logger.error(f"Error analyzing sentiment: {str(e)}")
        raise


# ==================== ENDPOINTS ====================

@app.get("/health", response_model=HealthCheckResponse)
async def health_check():
    """Health check endpoint"""
    return HealthCheckResponse(
        status="operational",
        timestamp=datetime.utcnow().isoformat()
    )


@app.post("/analyze-review", response_model=ReviewAnalysisResponse)
async def analyze_review(request: ReviewAnalysisRequest) -> ReviewAnalysisResponse:
    """
    Analyze a parking review for sentiment and issue detection.
    
    Args:
        request: ReviewAnalysisRequest containing review text
        
    Returns:
        ReviewAnalysisResponse with sentiment and flags
        
    Raises:
        HTTPException: If text is empty or analysis fails
    """
    try:
        # Validate input
        if not request.text or not request.text.strip():
            raise HTTPException(
                status_code=400,
                detail="Review text cannot be empty"
            )
        
        text = request.text.strip()
        
        # Validate text length
        if len(text) > 5000:
            raise HTTPException(
                status_code=400,
                detail="Review text exceeds maximum length of 5000 characters"
            )
        
        logger.info(f"Analyzing review: {text[:100]}...")
        
        # Perform analysis
        sentiment_label, sentiment_score = analyze_sentiment(text)
        security_flag = detect_keywords(text, SECURITY_KEYWORDS)
        cleanliness_flag = detect_keywords(text, CLEANLINESS_KEYWORDS)
        
        # Log results
        logger.info(
            f"Analysis complete - Sentiment: {sentiment_label} "
            f"(score: {sentiment_score}), Security: {security_flag}, "
            f"Cleanliness: {cleanliness_flag}"
        )
        
        return ReviewAnalysisResponse(
            sentiment_label=sentiment_label,
            sentiment_score=sentiment_score,
            security_flag=security_flag,
            cleanliness_flag=cleanliness_flag,
            analyzed_at=datetime.utcnow().isoformat()
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error during analysis: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )


@app.get("/batch-health")
async def batch_health():
    """Endpoint for checking if service can handle batch operations"""
    return {
        "max_batch_size": 100,
        "timeout_seconds": 30,
        "status": "ready"
    }


# ==================== ERROR HANDLERS ====================

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler"""
    logger.error(f"Unhandled exception: {str(exc)}")
    return {
        "error": "Internal server error",
        "detail": str(exc),
        "timestamp": datetime.utcnow().isoformat()
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info"
    )
