package com.my.boardback.repository;

import com.my.boardback.entity.FavoriteEntity;
import com.my.boardback.entity.primarykey.FavoritePk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk> {
}
