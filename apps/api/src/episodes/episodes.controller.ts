import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, UploadedFile, UseInterceptors, BadRequestException, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { GetEpisodesQueryDto } from './dto/get-episodes-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

const ALLOWED_AUDIO_MIME_TYPES = [
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/ogg',
  'audio/flac',
  'audio/webm',
  'audio/aac',
  'audio/mp4',
];

const MAX_AUDIO_FILE_SIZE = 100 * 1024 * 1024;

const AUDIO_FILE_FILTER = (req: unknown, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
  if (!ALLOWED_AUDIO_MIME_TYPES.includes(file.mimetype)) {
    callback(new Error('Invalid audio file type'), false);
    return;
  }

  callback(null, true);
};

const sanitizeFileName = (fileName: string): string =>
  fileName
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9.\-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

@Controller('episodes')
export class EpisodesController {
  constructor(private episodesService: EpisodesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@GetUser('id') userId: string, @Body() dto: CreateEpisodeDto) {
    return this.episodesService.create(userId, dto);
  }

  @Get()
  findAll(@Query() query: GetEpisodesQueryDto) {
    return this.episodesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodesService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@GetUser('id') userId: string, @Param('id') id: string, @Body() dto: UpdateEpisodeDto) {
    return this.episodesService.update(id, userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/audio')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
      limits: { fileSize: MAX_AUDIO_FILE_SIZE },
      fileFilter: AUDIO_FILE_FILTER,
    }),
  )
  async uploadAudio(
    @GetUser('id') userId: string,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Audio file is required');
    }

    const originalName = file.originalname ? sanitizeFileName(file.originalname) : 'audio';
    const safeFileName = originalName || 'audio';
    return this.episodesService.uploadAudio(id, userId, file, safeFileName);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.episodesService.remove(id, userId);
  }
}
