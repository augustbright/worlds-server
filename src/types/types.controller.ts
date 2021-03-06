import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetAllQuery, TypeDto } from './types';
import { TypesService } from './types.service';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async updateOrCreate(@Body() typeDto: TypeDto, @Req() req: Request) {
    return this.typesService.update(typeDto, req.user.sub);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getAll(@Req() req: Request, @Query() query: GetAllQuery) {
    return this.typesService.getAll(req.user.sub, query);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Req() req: Request, @Param('id') id: string) {
    return this.typesService.delete(id, req.user.sub);
  }

  @Post('/external')
  @UseGuards(JwtAuthGuard)
  async publish(@Body() typeDto: TypeDto, @Req() req: Request) {
    return this.typesService.publish(typeDto, req.user.sub);
  }

  @Get('/external')
  @UseGuards(JwtAuthGuard)
  async search(@Req() req: Request, @Query('query') query: string) {
    return this.typesService.query(query);
  }

  @Get('/external/:id')
  @UseGuards(JwtAuthGuard)
  async getExternal(@Req() req: Request, @Param('id') id: string) {
    return this.typesService.getExternal(id);
  }
}
