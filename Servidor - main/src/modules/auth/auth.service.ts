import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/interfaces/user.interface';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
        private jwtService: JwtService
    ) {}
    
    async registerUser(registerAuthDto: RegisterAuthDto) {
        // Generamos un hash de la contraseña antes de almacenar el usuario 
        const { password } = registerAuthDto;
        const plainToHash = await hash(password, 10);
        registerAuthDto =  {...registerAuthDto, password: plainToHash};
        return await this.userModel.create(registerAuthDto);
    }

    async loginUser(loginAuthDto: LoginAuthDto) {
        const { email, password } = loginAuthDto;
        // Buscamos si existe el usuario en la base de datos
        const user = await this.userModel.findOne({ email });
        if (!user) throw new HttpException('User not found', 404);
        // Revisamos si la contraseña es correcta
        const checkPassword = await compare(password, user.password);
        if (!checkPassword) throw new HttpException('Incorrect password', 403);

        // Generamos el token
        const payload = {
            id: user._id,
            email: user.email
        };
        const token = await this.jwtService.sign(payload);
        // Creamos un objeto nuevo con el token generado
        const data = {
            user: user,
            token
        };
        return data;
    }
}
