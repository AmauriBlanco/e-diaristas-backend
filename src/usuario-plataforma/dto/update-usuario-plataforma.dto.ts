import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioPlataformaDto } from './create-usuario-plataforma.dto';

export class UpdateUsuarioPlataformaDto extends PartialType(
  CreateUsuarioPlataformaDto,
) {}
