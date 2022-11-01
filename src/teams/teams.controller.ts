import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamDto } from './dto/get-team.dto';
import { PutTeamDto } from './dto/put-team.dto';
import { Team } from './teams.model';
import { TeamsService } from './teams.service';

@ApiTags('Команды')
@Controller('teams')
@UseGuards(RolesGuard)
@Roles('ADMIN')
export class TeamsController {
  constructor(private teamService: TeamsService) {}

  @ApiOperation({ summary: 'Создание команды' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Team })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreateTeamDto) {
    return this.teamService.create(dto);
  }

  @ApiOperation({ summary: 'Получение команды' })
  @ApiResponse({ status: HttpStatus.OK, type: Team })
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.teamService.getById(Number(id));
  }

  @ApiOperation({ summary: 'Получение всех команд' })
  @ApiResponse({ status: HttpStatus.OK, type: [Team] })
  @Get()
  getAll(@Query() query?: GetTeamDto) {
    return this.teamService.getAll(query);
  }

  @ApiOperation({ summary: 'Обновление команды' })
  @ApiResponse({ status: HttpStatus.OK, type: Team })
  @Put('/:id')
  put(@Body() dto: PutTeamDto, @Param('id') id: string) {
    return this.teamService.put({ id: Number(id), dto });
  }

  @ApiOperation({ summary: 'Удаление команды' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete('/:id')
  delete(@Param('id') id: string) {
    this.teamService.delete(Number(id));
  }
}
