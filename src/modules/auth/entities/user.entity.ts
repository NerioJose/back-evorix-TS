import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum RolUsuario {
  ADMIN = 'admin',
  USUARIO = 'usuario',
  CLIENTE = 'cliente',
}

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ unique: false })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: RolUsuario, default: RolUsuario.CLIENTE })
  rol: RolUsuario;

  @CreateDateColumn()
  creadoEn: Date;
}
