package com.my.boardback.entity.primarykey;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class FavoritePk implements Serializable {

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "board_number")
    private Long boardNumber;
}
