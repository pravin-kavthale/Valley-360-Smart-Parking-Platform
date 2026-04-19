-- Migration: Add AI Review Analysis Fields and Owner Metrics Table
-- Date: 2025-04-18
-- Step 1: Alter reviews table to add AI analysis fields
ALTER TABLE reviews
ADD COLUMN sentiment_label VARCHAR(50) DEFAULT NULL
AFTER comment;
ALTER TABLE reviews
ADD COLUMN sentiment_score DOUBLE DEFAULT NULL
AFTER sentiment_label;
ALTER TABLE reviews
ADD COLUMN security_flag BOOLEAN DEFAULT FALSE
AFTER sentiment_score;
ALTER TABLE reviews
ADD COLUMN cleanliness_flag BOOLEAN DEFAULT FALSE
AFTER security_flag;
ALTER TABLE reviews
ADD COLUMN ai_processed BOOLEAN DEFAULT FALSE
AFTER cleanliness_flag;
ALTER TABLE reviews
ADD COLUMN ai_processed_at DATETIME DEFAULT NULL
AFTER ai_processed;
-- Add owner_id to reviews if not exists
ALTER TABLE reviews
ADD COLUMN owner_id BIGINT DEFAULT NULL
AFTER user_id;
ALTER TABLE reviews
ADD FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE;
-- Create owner_metrics table
CREATE TABLE IF NOT EXISTS owner_metrics (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    owner_id BIGINT UNIQUE NOT NULL,
    total_reviews INT DEFAULT 0,
    positive_reviews INT DEFAULT 0,
    neutral_reviews INT DEFAULT 0,
    negative_reviews INT DEFAULT 0,
    security_flags INT DEFAULT 0,
    cleanliness_flags INT DEFAULT 0,
    average_rating DOUBLE DEFAULT 0.0,
    trust_score DOUBLE DEFAULT 100.0,
    risk_level VARCHAR(20) DEFAULT 'LOW',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_owner_id (owner_id),
    INDEX idx_trust_score (trust_score),
    INDEX idx_risk_level (risk_level)
);
-- Create index for query performance
CREATE INDEX idx_reviews_owner ON reviews(owner_id);
CREATE INDEX idx_reviews_ai_processed ON reviews(ai_processed);
CREATE INDEX idx_reviews_sentiment ON reviews(sentiment_label);