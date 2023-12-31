package com.my.boardback.service;

import com.my.boardback.dto.request.auth.SignInRequestDto;
import com.my.boardback.dto.request.auth.SignUpRequestDto;
import com.my.boardback.dto.response.auth.SignInResponseDto;
import com.my.boardback.dto.response.auth.SignUpResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
}
