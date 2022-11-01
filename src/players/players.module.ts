import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { PlayersController } from './players.controller';
import { Player } from './players.model';
import { PlayersService } from './players.service';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService],
  imports: [SequelizeModule.forFeature([Player]), AuthModule],
})
export class PlayersModule {}
