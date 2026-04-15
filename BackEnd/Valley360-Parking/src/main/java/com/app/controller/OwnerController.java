package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OwnerSlotTimelineDTO;
import com.app.dto.ParkingAreaDTO;
import com.app.dto.ParkingSlotDTO;
import com.app.service.OwnerViewService;

@RestController
@RequestMapping("/owner")
@CrossOrigin(origins = "*")
public class OwnerController {

    @Autowired
    private OwnerViewService ownerViewService;

    @GetMapping("/parking-areas")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<List<ParkingAreaDTO>> getOwnerParkingAreas() {
        return ResponseEntity.ok(ownerViewService.getOwnerParkingAreas());
    }

    @GetMapping("/parking-area/{areaId}/slots")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<List<ParkingSlotDTO>> getOwnerAreaSlots(@PathVariable Long areaId) {
        return ResponseEntity.ok(ownerViewService.getOwnerParkingAreaSlots(areaId));
    }

    @GetMapping("/slot/{slotId}/timeline")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<List<OwnerSlotTimelineDTO>> getOwnerSlotTimeline(@PathVariable Long slotId) {
        return ResponseEntity.ok(ownerViewService.getOwnerSlotTimeline(slotId));
    }
}
