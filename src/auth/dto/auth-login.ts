import { IsEmail, IsString } from "class-validator";

export class AuthLoginDto {

    @IsEmail()
    email : string;

    @IsString()
    password : string;

}