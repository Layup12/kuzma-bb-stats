import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamDto } from './dto/get-team.dto';
import { PutTeamDto } from './dto/put-team.dto';
import { Team } from './teams.model';

@Injectable()
export class TeamsService {
  constructor(@InjectModel(Team) private teamRepository: typeof Team) {}

  async create(dto: CreateTeamDto) {
    const team = await this.teamRepository.create(dto);
    return team;
  }

  async getAll(query?: GetTeamDto) {
    const name = query?.name && { [Op.iLike]: `%${query.name}%` };
    const _query = {
      ...query,
    };
    if (name) {
      _query.name = name;
    }
    const teams = await this.teamRepository.findAll({
      where: { ..._query },
      include: { all: true },
    });
    return teams;
  }

  async getById(id: number) {
    const team = await this.teamRepository.findOne({ where: { id } });
    return team;
  }

  async put({ id, dto }: { id: number; dto: PutTeamDto }) {
    const affectedCount = await this.teamRepository.update(dto, {
      where: { id },
    });

    if (!affectedCount[0]) {
      throw new HttpException('Команда не найдена', HttpStatus.NOT_FOUND);
    }

    const updatedTeam = await this.teamRepository.findByPk(id);
    return updatedTeam;
  }

  async delete(id: number) {
    const team = await this.teamRepository.destroy({ where: { id } });
    return team;
  }
}
