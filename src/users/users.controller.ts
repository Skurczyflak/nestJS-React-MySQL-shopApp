import { Controller, Get, Delete, Param, Post, Body, Put, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';

import { CreateUserDTO } from './dtos/create-users.dto';
import { UpdateUserDTO } from './dtos/update-users.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/')
    public getAll():any {
        return this.usersService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const user = await this.usersService.getById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Get('/login/:login')
    async getByLogin(@Param('login') login: string) {
        const user = await this.usersService.getByLogin(login);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Post('/')
    create(@Body() userData: CreateUserDTO) {
        return this.usersService.create(userData);
    }

    @Delete('/:id')
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if(!await this.usersService.getById(id)) {
            throw new NotFoundException('User not found');
        }
        await this.usersService.deleteById(id);
        return{ success: true };
    }

    @Put('/:id')
    async updateById(@Param('id', new ParseUUIDPipe()) id: string, @Body() userData: UpdateUserDTO) {
        if(!await this.usersService.getById(id)) {
            throw new NotFoundException('User not found');
        }
        return this.usersService.updateById(id, userData);
    }

}
