package com.app.service;

import java.util.List;

import com.app.dto.OwnerSlotTimelineDTO;
import com.app.dto.ParkingAreaDTO;
import com.app.dto.ParkingSlotDTO;

public interface OwnerViewService {

    List<ParkingAreaDTO> getOwnerParkingAreas();

    List<ParkingSlotDTO> getOwnerParkingAreaSlots(Long areaId);

    List<OwnerSlotTimelineDTO> getOwnerSlotTimeline(Long slotId);
}
