import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TypeDto } from './types';
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
  async getAll(@Req() req: Request) {
    return this.typesService.getAll(req.user.sub);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Req() req: Request, @Param('id') id: string) {
    return this.typesService.delete(id, req.user.sub);
  }
}
