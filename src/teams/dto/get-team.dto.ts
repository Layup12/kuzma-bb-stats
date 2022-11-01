import { Op } from 'sequelize';

export class GetTeamDto {
  readonly name?:
    | string
    | {
        [Op.iLike]: string;
      };
}
