import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { LibraryService } from './library.service';
import { UpdateListeningHistoryDto } from './dto/update-listening-history.dto';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@UseGuards(JwtAuthGuard)
@Controller('library')
export class LibraryController {
  constructor(private libraryService: LibraryService) {}

  @Get()
  async getOverview(@GetUser('id') userId: string) {
    const subscriptions = await this.libraryService.getSubscriptions(userId);
    const continueListening = await this.libraryService.getContinueListening(userId);
    const history = await this.libraryService.getHistory(userId);
    return { subscriptions, continueListening, history };
  }

  @Get('subscriptions')
  async listSubscriptions(@GetUser('id') userId: string) {
    return this.libraryService.getSubscriptions(userId);
  }

  @Post('subscriptions/:podcastId')
  async subscribe(@GetUser('id') userId: string, @Param('podcastId') podcastId: string) {
    return this.libraryService.subscribe(userId, podcastId);
  }

  @Delete('subscriptions/:podcastId')
  async unsubscribe(@GetUser('id') userId: string, @Param('podcastId') podcastId: string) {
    return this.libraryService.unsubscribe(userId, podcastId);
  }

  @Get('continue-listening')
  async continueListening(@GetUser('id') userId: string) {
    return this.libraryService.getContinueListening(userId);
  }

  @Get('history')
  async getHistory(@GetUser('id') userId: string) {
    return this.libraryService.getHistory(userId);
  }

  @Patch('history/:episodeId')
  async updateHistory(
    @GetUser('id') userId: string,
    @Param('episodeId') episodeId: string,
    @Body() dto: UpdateListeningHistoryDto,
  ) {
    return this.libraryService.updateListeningProgress(userId, episodeId, dto);
  }

  @Get('favorites')
  async getFavorites(@GetUser('id') userId: string) {
    return this.libraryService.getFavorites(userId);
  }

  @Post('favorites')
  async saveFavorite(@GetUser('id') userId: string, @Body() dto: CreateFavoriteDto) {
    return this.libraryService.saveFavorite(userId, dto);
  }

  @Delete('favorites/:episodeId')
  async removeFavorite(@GetUser('id') userId: string, @Param('episodeId') episodeId: string) {
    return this.libraryService.removeFavorite(userId, episodeId);
  }
}
