import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [],
  exports: [], // Si deseas que otros módulos accedan a sus servicios, debes exportarlos
})
export class AuthModule {}
