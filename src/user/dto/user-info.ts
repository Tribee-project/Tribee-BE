import { User } from "../user.entity";

export class UserInfoDto {
    id: string;
    email: string;
    nickname: string;

    constructor(user: User) {
        this.email = user.email;
        this.nickname = user.nickname;
    }
}