/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { PrismaService } from 'prisma.service';

@Injectable()

export class UrlService {
  constructor(private prisma: PrismaService){}


  async create(CreateUrlDto: CreateUrlDto) {

    try {
    const { originalUrl } = CreateUrlDto; 

    if (!originalUrl) {
      throw new Error('Original URL is required');
    }

    const shortUrl = await this.generateShortUrl();

    return this.prisma.url.create({
      data: {
        originalUrl,  
        shortCode: shortUrl,

      }
    }
    );
      
    } catch (error) {
      console.error('Error creating URL:', error);
      throw new Error('Failed to create URL');
  }
  }

  async getOriginalUrl(code: string) {
   try {
      const urlEntry = await this.prisma.url.findUnique({
        where: { shortCode: code },
      });

      if (!urlEntry) {
        throw new Error('URL not found');
      }

      return urlEntry.originalUrl;

   } catch (error) {
      console.error('Error retrieving original URL:', error);
      throw new Error('Failed to retrieve original URL');
    
   }


  }

  async clickCount (code: string) {
    try {
      const urlEntry = await this.prisma.url.findUnique({
        where: { shortCode: code },
      });

      if (!urlEntry) {
        throw new Error('URL not found');
      }

      const currentCount = parseInt(urlEntry.count || '0', 10);
      const newCount = currentCount + 1;

      await this.prisma.url.update({
        where: { shortCode: code },
        data: { count: newCount.toString() },
      });
    } catch (error) {
      console.error('Error updating click count:', error);
      throw new Error('Failed to update click count');
    }
  }

  async getStats(code: string) {
    try {
      const urlEntry = await this.prisma.url.findUnique({
        where: { shortCode: code },
      });

      if (!urlEntry) {
        throw new Error('URL not found');
      }

      return {
        originalUrl: urlEntry.originalUrl,
        clickCount: urlEntry.count || '0',
      };
    } catch (error) {
      console.error('Error retrieving stats:', error);
      throw new Error('Failed to retrieve stats');
    }

  }

  private async generateShortUrl(): Promise<string> {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortUrl = '';
    for (let i = 0; i < 6; i++) {
      shortUrl += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return shortUrl;
  }
  }
