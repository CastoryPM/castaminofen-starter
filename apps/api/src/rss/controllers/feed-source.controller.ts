import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FeedSourceService } from '../services/feed-source.service';
import { CreateFeedSourceDto } from '../dto/create-feed-source.dto';
import { UpdateFeedSourceDto } from '../dto/update-feed-source.dto';

@Controller('api/v1/internal/rss/feed-sources')
export class FeedSourceController {
  constructor(private readonly feedSourceService: FeedSourceService) {}

  /**
   * GET /api/v1/internal/rss/feed-sources
   * List all FeedSources.
   */
  @Get()
  @HttpCode(200)
  async findAll() {
    try {
      return await this.feedSourceService.findAll();
    } catch {
      throw new InternalServerErrorException('Failed to retrieve FeedSources');
    }
  }

  /**
   * GET /api/v1/internal/rss/feed-sources/:id
   * Get a single FeedSource by ID.
   */
  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id') id: string) {
    try {
      return await this.feedSourceService.findById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve FeedSource');
    }
  }

  /**
   * POST /api/v1/internal/rss/feed-sources
   * Create a new FeedSource.
   */
  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateFeedSourceDto) {
    try {
      return await this.feedSourceService.create(dto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create FeedSource');
    }
  }

  /**
   * PATCH /api/v1/internal/rss/feed-sources/:id
   * Update a FeedSource (only operational fields).
   */
  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() dto: UpdateFeedSourceDto) {
    try {
      return await this.feedSourceService.update(id, dto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof ConflictException) {
        throw error;
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update FeedSource');
    }
  }

  /**
   * DELETE /api/v1/internal/rss/feed-sources/:id
   * Delete a FeedSource.
   * Returns 409 Conflict if the FeedSource is in use.
   */
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      await this.feedSourceService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete FeedSource');
    }
  }
}
