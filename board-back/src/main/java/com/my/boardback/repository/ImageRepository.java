package com.my.boardback.repository;

import com.my.boardback.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageEntity, Long> {

}
