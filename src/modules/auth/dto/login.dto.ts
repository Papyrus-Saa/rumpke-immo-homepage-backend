import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'E-Mail muss eine gültige E-Mail-Adresse sein' })
  email: string;

  @IsString({ message: 'Passwort muss eine Zeichenkette sein' })
  @MinLength(6, { message: 'Passwort muss mindestens 6 Zeichen lang sein' })
  password: string;
}
