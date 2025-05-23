import { IsEmail, IsString } from "class-validator";

export class AuthSignUpDto {

    @IsEmail()
    email : string;

    @IsString()
    password : string;

    @IsString()
    nickname : string;
}