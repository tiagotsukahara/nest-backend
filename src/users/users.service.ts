import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Users from './entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private readonly entityManager: EntityManager,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const login = createUserDto.login;
        const existLogin = await this.usersRepository
            .createQueryBuilder('users')
            .where('users.login = :login', {login})
            .select(['users.login'])
            .getOne();
        if ( existLogin ){
            throw new HttpException('Login já existe', HttpStatus.BAD_REQUEST)
        }
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        const user = new Users(createUserDto);
        await this.entityManager.save(user);
        return user;
    }

    async findAll() {
        return this.usersRepository.find();
    }

    async findOne(id: number) {
        return this.usersRepository.findOne({ where: { id: id } });
    }

    async findOneWithLogin(login: string) {
        return await this.usersRepository.findOne({ where: { login: login } });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findOneBy({ id });
        user.name = updateUserDto.name;
        user.email = updateUserDto.email;
        user.password = updateUserDto.password;
        await this.entityManager.save(user);
    }

    async remove(id: number) {
        return this.usersRepository.delete(id);
    }
}
