import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CartItem } from '@prisma/client';

export class UpdateCartDTO {
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    userId: string

    @IsString()
    items: CartItem[]
}