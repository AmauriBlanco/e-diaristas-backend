import { Type } from 'class-transformer';
import {
  IsCurrency,
  IsNotEmpty,
  IsNumber,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateServicoDto {
  @IsNotEmpty({ message: 'Campo nome não pode ser vazio' })
  @Length(3, 99, { message: 'Campo nome deve ter entre 3 e 99 caracteres' })
  nome: string;

  @IsCurrency(
    { thousands_separator: '.', decimal_separator: ',' },
    { message: 'Campo valor mínimo com formato inválido' },
  )
  @Matches(RegExp('^((?![-]).)*$'), {
    message: 'Valor mínimo não pode ser negativo',
  })
  valorMinimo: number;

  @IsNumber({}, { message: 'Campo quantidade horas deve ser um número' })
  @Min(0, { message: 'Campo quantidade horas deve ser maior ou igual a 0' })
  @Max(10, { message: 'Campo quantidade horas deve ser menor que 10' })
  @Type(() => Number)
  quantidadeHoras: number;

  @IsNumber({}, { message: 'Campo porcentagem deve ser um número' })
  @Min(0, { message: 'Campo porcentagem deve ser maior ou igual a 0' })
  @Max(100, { message: 'Campo porcentagem deve ser menor ou igual a 100' })
  @Type(() => Number)
  porcentagem: number;

  @IsCurrency(
    { thousands_separator: '.', decimal_separator: ',' },
    { message: 'Campo valor quarto com formato inválido' },
  )
  @Matches(RegExp('^((?![-]).)*$'), {
    message: 'campo valor quarto não pode ser negativo',
  })
  valorQuarto: number;

  @IsNumber({}, { message: 'Campo horas quarto deve ser um número' })
  @Min(0, { message: 'Campo horas quarto deve ser maior ou igual a 0' })
  @Max(10, { message: 'Campo quantidade horas deve ser menor ou igual a 0' })
  @Type(() => Number)
  horasQuarto: number;

  @IsCurrency(
    { thousands_separator: '.', decimal_separator: ',' },
    { message: 'Campo valor sala com formato inválido' },
  )
  @Matches(RegExp('^((?![-]).)*$'), {
    message: 'Campo valor sala não pode ser negativo',
  })
  valorSala: number;

  @IsNotEmpty({ message: 'Campo horas sala não pode ser vazio' })
  @IsNumber({}, { message: 'Campo horas sala deve ser um número' })
  @Min(0, { message: 'Campo horas sala deve ser maior ou igual a 0' })
  @Max(10, { message: 'Campo horas sala deve ser menor ou igual a 10' })
  @Type(() => Number)
  horasSala: number;

  @IsCurrency(
    { thousands_separator: '.', decimal_separator: ',' },
    { message: 'Campo valor banheiro com formato inválido' },
  )
  @Matches(RegExp('^((?![-]).)*$'), {
    message: 'Campo valor banheiro não pode ser negativo',
  })
  valorBanheiro: number;

  @IsNumber({}, { message: 'Campo horas banheiro deve ser um número' })
  @Min(0, { message: 'Campo horas banheiro deve ser maior ou igual a 0' })
  @Max(10, { message: 'Campo horas banheiro deve ser menor ou igual a 10' })
  @Type(() => Number)
  horasBanheiro: number;

  @IsCurrency(
    { thousands_separator: '.', decimal_separator: ',' },
    { message: 'Campo valor cozinha com formato inválido' },
  )
  @Matches(RegExp('^((?![-]).)*$'), {
    message: 'Campo valor cozinha não pode ser negativo',
  })
  valorCozinha: number;

  @IsNumber({}, { message: 'Campo horas cozinha deve ser um número' })
  @Min(0, { message: 'Campo horas cozinha deve ser maior ou igual a 0' })
  @Max(10, { message: 'Campo horas cozinha deve ser menor ou igual a 10' })
  @Type(() => Number)
  horasCozinha: number;

  @IsCurrency(
    { thousands_separator: '.', decimal_separator: ',' },
    { message: 'Campo valor quintal com formato inválido' },
  )
  @Matches(RegExp('^((?![-]).)*$'), {
    message: 'Campo valor quintal não pode ser negativo',
  })
  valorQuintal: number;

  @IsNumber({}, { message: 'Campo horas quintal deve ser um número' })
  @Min(0, { message: 'Campo horas quintal deve ser maior ou igual a 0' })
  @Max(10, { message: 'Campo horas quintal deve ser menor ou igual a 10' })
  @Type(() => Number)
  horasQuintal: number;

  @IsCurrency(
    { thousands_separator: '.', decimal_separator: ',' },
    { message: 'Campo valor outros com formato inválido' },
  )
  @Matches(RegExp('^((?![-]).)*$'), {
    message: 'Campo valor outros não pode ser negativo',
  })
  valorOutros: number;

  @IsNotEmpty({ message: 'Campo horas outros não pode ser vazio' })
  @IsNumber({}, { message: 'Campo horas outros deve ser um número' })
  @Min(0, { message: 'Campo horas outros deve ser maior ou igual a 0' })
  @Max(10, { message: 'Campo horas outros deve ser menor ou igual a 10' })
  @Type(() => Number)
  horasOutros: number;

  @IsNotEmpty({ message: 'Campo icone não pode ser vazio' })
  icone: string;

  @IsNumber({}, { message: 'Campo posição deve ser um número' })
  @Min(1, { message: 'Campo posição horas deve ser maior ou igual a 1' })
  @Type(() => Number)
  posicao: number;
}
