import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUsuarioPlataformaDto {
  @IsNotEmpty({ message: 'Campo nome não pode ser vazio' })
  @Length(3, 255, { message: 'Campo nome deve ter de 3 até 255 caracteres' })
  nome: string;

  @IsNotEmpty({ message: 'Campo email não pode ser vazio' })
  @Length(3, 255, { message: 'Campo email deve ter de 3 até 255 caracteres' })
  @IsEmail({ message: 'Digite um email válido' })
  email: string;

  @IsNotEmpty({ message: 'Campo senha não pode ser vazio' })
  @Length(8, 20, { message: 'Campo senha deve ter de 8 até 20 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'Campo confirmação de senha não pode ser vazio' })
  @Length(8, 20, {
    message: 'Campo confirmação de senha deve ter de 8 até 20 caracteres',
  })
  passwordConfirmation: string;
}
