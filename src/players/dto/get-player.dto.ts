import { Op } from 'sequelize';

export class GetPlayerDto {
  readonly name?:
    | string
    | {
        [Op.iLike]: string;
      };
}
