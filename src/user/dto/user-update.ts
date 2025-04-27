import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class UserUpdateDto {

    @IsString()
    @IsNotEmpty()
    nickname: string
}