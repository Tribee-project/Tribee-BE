import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthSignUpDto } from './dto/auth-signUp';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { AuthLoginDto } from './dto/auth-login';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async createUser(authSignUpDto: AuthSignUpDto): Promise<void> {
        const {email, password, nickname} = authSignUpDto;

        // 추후 암호화 주체 정하기
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({
            email,
            password,
            nickname
        });

        await this.userRepository.save(user);
    }

    async loginUser(authLoginDto: AuthLoginDto): Promise<{accessToken: string}>{
        const {email, password} = authLoginDto;
        const user = await this.userRepository.findOneBy({email});

        if(user && (password === user.password)) {
            const payload = {id: user.id, email: email, nickname: user.nickname};
            const accessToken = await this.jwtService.sign(payload);
            return {accessToken};
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
