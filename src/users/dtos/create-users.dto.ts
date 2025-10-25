import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    login: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsBoolean()
    isAdmin: boolean;
}