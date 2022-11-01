import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PutPlayerDto } from './dto/put-player.dto';
import { PlayersService } from './players.service';

@ApiTags('Игроки')
@Controller('players')
@UseGuards(RolesGuard)
@Roles('ADMIN')
export class PlayersController {
  constructor(private teamService: PlayersService) {}

  @ApiOperation({ summary: 'Создание игрока' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreatePlayerDto) {
    return this.teamService.create(dto);
  }

  @ApiOperation({ summary: 'Получение игроков' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.teamService.getById(Number(id));
  }

  @ApiOperation({ summary: 'Получение всех игроков' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get()
  getAll() {
    return this.teamService.getAll();
  }

  @ApiOperation({ summary: 'Обновление игрока' })
  @ApiResponse({ status: HttpStatus.OK })
  @Put('/:id')
  put(@Body() dto: PutPlayerDto, @Param('id') id: string) {
    return this.teamService.put({ id: Number(id), dto });
  }

  @ApiOperation({ summary: 'Удаление игрока' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete('/:id')
  delete(@Param('id') id: string) {
    this.teamService.delete(Number(id));
  }
}
