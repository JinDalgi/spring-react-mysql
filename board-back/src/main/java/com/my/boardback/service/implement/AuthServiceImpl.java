package com.my.boardback.service.implement;

import com.my.boardback.dto.request.auth.SignInRequestDto;
import com.my.boardback.dto.request.auth.SignUpRequestDto;
import com.my.boardback.dto.response.ResponseDto;
import com.my.boardback.dto.response.auth.SignInResponseDto;
import com.my.boardback.dto.response.auth.SignUpResponseDto;
import com.my.boardback.entity.UserEntity;
import com.my.boardback.provider.JwtProvider;
import com.my.boardback.repository.UserRepository;
import com.my.boardback.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtProvider jwtProvider;

    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {

        String email = dto.getEmail();
        boolean existedEmail = userRepository.existsByEmail(email);
        if (existedEmail) return SignUpResponseDto.duplicateEmail();

        String nickname = dto.getNickname();
        boolean existedNickname = userRepository.existsByNickname(nickname);
        if (existedNickname) return SignUpResponseDto.duplicateNickName();

        String telNumber = dto.getTelNumber();
        boolean existedTelNumber = userRepository.existsByTelNumber(telNumber);
        if (existedTelNumber) return SignUpResponseDto.duplicateTelNumber();

        String password = dto.getPassword();

        String encodedPassword = passwordEncoder.encode(password);
        dto.setPassword(encodedPassword);

        UserEntity userEntity = new UserEntity(dto);

        userRepository.save(userEntity);

        try {

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignUpResponseDto.success();
    }

    @Override
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {

        String token = null;

        try {

            String email = dto.getEmail();
            UserEntity userEntity = userRepository.findByEmail(email);

            if (userEntity == null) return SignInResponseDto.signInFailed();

            String password = dto.getPassword();
            String encodedPassword = userEntity.getPassword();
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);

            if (!isMatched) return SignInResponseDto.signInFailed();

            token = jwtProvider.create(email);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignInResponseDto.success(token);
    }
}
