import { IsNotEmpty } from 'class-validator';

export class PasswordResetConfirmacaoDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  passwordConfirmation: string;

  @IsNotEmpty()
  token: string;
}
