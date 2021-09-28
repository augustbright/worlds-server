import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DescriptorsService } from './descriptors.service';
import { RearrangeDto } from './types';

@Controller('descriptors')
export class DescriptorsController {
  constructor(private readonly descriptorsService: DescriptorsService) {}

  @Post('/rearrange')
  @UseGuards(JwtAuthGuard)
  async rearrange(@Req() req: Request, @Body() items: RearrangeDto) {
    return this.descriptorsService.rearrange(items, req.user.sub);
  }
}
