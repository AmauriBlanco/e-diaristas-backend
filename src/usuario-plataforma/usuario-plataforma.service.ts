import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    throw new BadRequestException('Email já cadastrado');
  }

  async findAll() {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usuarioRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usuarioRepository.findOneBy({ email: email });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(
    id: number,
    updateUsuarioPlataformaDto: UpdateUsuarioPlataformaDto,
  ) {
    const user = await this.usuarioRepository.findOneBy({ id: id });
    const userEmail = await this.usuarioRepository.findOneBy({
      email: updateUsuarioPlataformaDto.email,
    });

    if (
      updateUsuarioPlataformaDto.password !==
      updateUsuarioPlataformaDto.passwordConfirmation
    ) {
      throw new BadRequestException('Senha não confere');
    } else if (!userEmail || userEmail.email === user.email) {
      user.nome = updateUsuarioPlataformaDto.nome;
      user.email = updateUsuarioPlataformaDto.email;
      user.password = await this.setPassword(
        updateUsuarioPlataformaDto.password,
      );
      await this.usuarioRepository.save(user);
      return user;
    } else if (userEmail.email !== user.email) {
      throw new BadRequestException('Email já cadastrado, usar outro email');
    }
  }

  async remove(id: number) {
    const result = await this.usuarioRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Nenhum ID encontrado');
    }
  }

  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  }
}
