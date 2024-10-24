import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, {message: "Email is invalid"})
    @IsNotEmpty({message: "Email cannot be empty"})
    email: string;

    @IsNotEmpty({message: "Password cannot be empty"})
    password: string;

    name: string;
    address: string;
}
