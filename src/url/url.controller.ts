/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import {
  Body,
  Controller,
  Delete, 
  Get,
  Param,
  Post,
} from '@nestjs/common';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post(`shorten`)
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }

  @Get(':code')
  getOriginalUrl(@Param('code') code: string) {
    return this.urlService.getOriginalUrl(code);
  }

  @Get('stats/:code')
  getStats(@Param('code') code: string) {
    return this.urlService.getStats(code);
  }


  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.urlService.remove(+id);
  // }
}
