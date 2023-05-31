import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { LoginAuthDto } from "./login-auth.dto";

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly role: string;

    readonly lab: string;
}