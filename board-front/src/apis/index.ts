import {SignInRequestDto, SignUpRequestDto} from "./request/auth";
import axios from "axios";
import {SignInResponseDto} from "./response/auth";
import {ResponseDto} from "./response";


const API_DOMAIN = `/api/v1/`;

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const signInRequest = async (requestBody: SignInRequestDto) => {

// /api/v1/auth/sign-in

  try {
    const response = await axios.post(SIGN_IN_URL(), requestBody)
    const responseBody = response.data
    return responseBody
  } catch (err: any) {
    console.error(err);
    if (!err.response.data) return null;
    const responseBody: ResponseDto = err.response.data;
    return responseBody;
      
  }

}

export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    
}