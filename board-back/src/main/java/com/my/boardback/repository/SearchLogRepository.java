package com.my.boardback.repository;

import com.my.boardback.entity.SearchLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Long> {

}
