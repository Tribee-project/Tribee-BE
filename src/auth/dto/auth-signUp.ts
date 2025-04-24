import { IsEmail, IsString } from "class-validator";
import { isString } from "util";

export class AuthSignUpDto {

    @IsString()
    @IsEmail()
    email : string;

    @IsString()
    password : string;

    @IsString()
    nickname : string;
}