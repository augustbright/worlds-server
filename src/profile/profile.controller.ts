import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { ProfileDto } from './types';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getOwnProfile(@Req() req: Request) {
    return this.profileService.getProfile(req.user.sub);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async updateOwnProfile(@Req() req: Request, @Body() profileDto: ProfileDto) {
    return this.profileService.updateProfile(profileDto, req.user.sub);
  }
}
