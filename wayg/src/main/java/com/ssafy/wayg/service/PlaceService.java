package com.ssafy.wayg.service;

import com.ssafy.wayg.dto.PlaceDto;
import com.ssafy.wayg.dto.PlacescrapDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PlaceService {

	Page<PlaceDto> retrievePlace(int userNo, Pageable pageable) throws Exception;

	PlaceDto detailPlace(int userNo, int placeNo) throws Exception;

	PlacescrapDto insertScrap(PlacescrapDto scrap) throws Exception;

	void deleteScrap(int userNo, int placeNo) throws Exception;

	Page<PlaceDto> retrieveScrapList(int userNo, Pageable pageable) throws Exception;

	List<String> searchPlace(String keyword) throws Exception;

	PlaceDto searchName(String name);

//	long getTotalCount() throws Exception;

}
