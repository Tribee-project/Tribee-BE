import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,

        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        super({
            secretOrKey: jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()

        })
    }

    async validate(payload) {
        const {email} = payload;
        const user: User = await this.userRepository.findOne({where: {email}});

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}