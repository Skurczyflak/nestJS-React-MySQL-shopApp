import { IsNotEmpty, IsInt, IsString, Min, IsUUID } from 'class-validator';

export class CreateCartItemDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    productId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    cartId: string;

    @IsNotEmpty()
    @IsString()
    color: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity: number;
}