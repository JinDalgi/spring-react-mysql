package com.my.boardback.entity;

import com.my.boardback.entity.primarykey.FavoritePk;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "favorite")
@Table(name = "favorite")
@IdClass(FavoritePk.class)
public class FavoriteEntity {

    @Id
    private String userEmail;

    @Id
    private Long boardNumber;
}
