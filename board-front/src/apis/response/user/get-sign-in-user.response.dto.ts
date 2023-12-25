import ResponseDto from "../response.dto";
import {LoginUser} from "../../../types/interface";

export default interface GetSignInUserResponseDto extends ResponseDto, LoginUser {

}