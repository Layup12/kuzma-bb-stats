import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

import { RolesService } from './roles.service';

@ApiTags('Роли')
@Controller('roles')
@UseGuards(RolesGuard)
@Roles('ADMIN')
export class RolesController {
  constructor(private usersService: RolesService) {}

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Role })
  @Post()
  create(@Body() userDto: CreateRoleDto) {
    return this.usersService.createRole(userDto);
  }

  @ApiOperation({ summary: 'Получение роли по значению' })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.usersService.getRoleByValue(value);
  }
}
