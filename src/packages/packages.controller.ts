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
import { PackagesService } from './packages.service';
import { PackageDto } from './types';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async updateOrCreate(@Body() packageDto: PackageDto, @Req() req: Request) {
    return this.packagesService.update(packageDto, req.user.sub);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getAll(@Req() req: Request) {
    return this.packagesService.getAll(req.user.sub);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Req() req: Request, @Param('id') id: string) {
    return this.packagesService.delete(id, req.user.sub);
  }
}
