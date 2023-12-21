package com.my.boardback.controller;

import com.my.boardback.dto.request.auth.SignInRequestDto;
import com.my.boardback.dto.request.auth.SignUpRequestDto;
import com.my.boardback.dto.response.auth.SignInResponseDto;
import com.my.boardback.dto.response.auth.SignUpResponseDto;
import com.my.boardback.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor

public class AuthController {

    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDto> signUp(@RequestBody @Valid SignUpRequestDto dto) {
        return authService.signUp(dto);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResponseDto> signIn(@RequestBody @Valid SignInRequestDto dto) {
        return authService.signIn(dto);
    }
}
