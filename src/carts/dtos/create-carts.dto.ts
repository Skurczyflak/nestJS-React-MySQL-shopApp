import { IsNotEmpty, IsString, IsUUID, IsArray } from 'class-validator';

export class CreateCartDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string
}