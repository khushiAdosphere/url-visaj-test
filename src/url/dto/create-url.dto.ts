import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
    @IsString()
    @IsNotEmpty()
    @IsUrl({}, { message: 'Please provide a valid URL' })
    originalUrl: string;
}