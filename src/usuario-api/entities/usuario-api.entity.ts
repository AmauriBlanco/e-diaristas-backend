import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ synchronize: false })
export class UsuarioApi {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nome_completo', nullable: false })
  nomeCompleto: string;

  @Column({ name: 'chave_pix' })
  chavePix: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  senha: string;

  @Column({ nullable: false })
  tipoUsuario: number;
}
