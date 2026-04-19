package com.app.repository;

import com.app.entities.OwnerMetrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for OwnerMetrics entity
 */
@Repository
public interface OwnerMetricsRepository extends JpaRepository<OwnerMetrics, Long> {

    /**
     * Find metrics by owner ID
     */
    Optional<OwnerMetrics> findByOwnerId(Long ownerId);

    /**
     * Find all owners with HIGH or CRITICAL risk level
     */
    @Query("SELECT om FROM OwnerMetrics om WHERE om.riskLevel IN ('HIGH', 'CRITICAL') ORDER BY om.trustScore ASC")
    List<OwnerMetrics> findHighRiskOwners();

    /**
     * Find owners sorted by trust score (ascending)
     */
    @Query("SELECT om FROM OwnerMetrics om ORDER BY om.trustScore ASC")
    List<OwnerMetrics> findAllOrderByTrustScore();

    /**
     * Find owners with negative review percentage >= threshold
     */
    @Query("SELECT om FROM OwnerMetrics om WHERE (om.negativeReviews * 100.0 / om.totalReviews) >= :threshold AND om.totalReviews > 0")
    List<OwnerMetrics> findOwnersWithHighNegativePercentage(Integer threshold);

    /**
     * Find owners with security issues
     */
    @Query("SELECT om FROM OwnerMetrics om WHERE om.securityFlags >= :minFlags ORDER BY om.securityFlags DESC")
    List<OwnerMetrics> findOwnersWithSecurityIssues(Integer minFlags);
}
