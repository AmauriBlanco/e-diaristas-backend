import { Injectable } from '@nestjs/common';
import { CreateUsuarioPlataformaDto } from './dto/create-usuario-plataforma.dto';
import { UpdateUsuarioPlataformaDto } from './dto/update-usuario-plataforma.dto';

@Injectable()
export class UsuarioPlataformaService {
  create(createUsuarioPlataformaDto: CreateUsuarioPlataformaDto) {
    return 'This action adds a new usuarioPlataforma';
  }

  findAll() {
    return `This action returns all usuarioPlataforma`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioPlataforma`;
  }

  update(id: number, updateUsuarioPlataformaDto: UpdateUsuarioPlataformaDto) {
    return `This action updates a #${id} usuarioPlataforma`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioPlataforma`;
  }
}
