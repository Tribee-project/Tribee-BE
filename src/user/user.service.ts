import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserInfoDto } from './dto/user-info';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getUserInfo(user: any) {
        const userinfo = new UserInfoDto(user);
        return userinfo;
    } 
}
