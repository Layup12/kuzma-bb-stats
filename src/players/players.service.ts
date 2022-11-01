import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PutPlayerDto } from './dto/put-player.dto';
import { Player } from './players.model';

@Injectable()
export class PlayersService {
  constructor(@InjectModel(Player) private playerRepository: typeof Player) {}
  async create(dto: CreatePlayerDto) {
    const team = await this.playerRepository.create(dto);
    return team;
  }
  async getAll() {
    const players = await this.playerRepository.findAll({
      include: { all: true },
    });
    return players;
  }
  async getById(id: number) {
    const team = await this.playerRepository.findOne({ where: { id } });
    return team;
  }
  async put({ id, dto }: { id: number; dto: PutPlayerDto }) {
    const affectedCount = await this.playerRepository.update(dto, {
      where: { id },
    });
    if (!affectedCount[0]) {
      throw new HttpException('Игрок не найден', HttpStatus.NOT_FOUND);
    }
    const updatedTeam = await this.playerRepository.findByPk(id);
    return updatedTeam;
  }
  async delete(id: number) {
    const team = await this.playerRepository.destroy({ where: { id } });
    return team;
  }
}
