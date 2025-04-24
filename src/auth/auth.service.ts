import { Injectable } from '@nestjs/common';
import { AuthSignUpDto } from './dto/auth-signUp';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createUser(authSignUpDto: AuthSignUpDto): Promise<void> {
        const {email, password, nickname} = authSignUpDto;

        // 프론트에서 암호화 후 넘기기
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({
            email,
            password,
            nickname
        });

        await this.userRepository.save(user);
    }
}
