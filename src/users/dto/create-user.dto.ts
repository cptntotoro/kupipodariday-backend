import {IsEmail, IsNotEmpty, IsString, IsUrl} from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string;

    about: string;

    @IsUrl()
    avatar: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    // public get fullName() {
    //     return this.firstName + this.lastName;
    // }
}