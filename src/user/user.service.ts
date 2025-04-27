import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserInfoDto } from './dto/user-info';
import { UserUpdateDto } from './dto/user-update';
import { UserPasswordDto } from './dto/user-password';

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

    async updateUserInfo(user:any, dto: UserUpdateDto) {
        if (!user) {
            throw new NotFoundException('User Not Found');
        }

        Object.assign(user, dto);

       await this.userRepository.save(user);
    }

    async updatePassword(user: any, dto: UserPasswordDto) {
        if (user.password === dto.password) {
            throw new BadRequestException('Do Not Update Same Password');
        }

        Object.assign(user, dto);

        await this.userRepository.save(user);
    }
}
