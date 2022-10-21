import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioPlataformaDto } from './dto/create-usuario-plataforma.dto';
import { UpdateUsuarioPlataformaDto } from './dto/update-usuario-plataforma.dto';
import { UsuarioPlataforma } from './entities/usuario-plataforma.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioPlataformaService {
  constructor(
    @InjectRepository(UsuarioPlataforma)
    private usuarioRepository: Repository<UsuarioPlataforma>,
  ) {}
  async create(createUsuarioPlataformaDto: CreateUsuarioPlataformaDto) {
    const user = await this.usuarioRepository.findOneBy({
      email: createUsuarioPlataformaDto.email,
    });
    if (
      createUsuarioPlataformaDto.password !==
      createUsuarioPlataformaDto.passwordConfirmation
    ) {
      throw new BadRequestException('Senha dos campos não conferem');
    } else if (!user) {
      createUsuarioPlataformaDto.password = await this.setPassword(
        createUsuarioPlataformaDto.password,
      );
      return this.usuarioRepository.save(createUsuarioPlataformaDto);
    }
    throw new BadRequestException('Email ja cadastrado');
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

  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  }
}
