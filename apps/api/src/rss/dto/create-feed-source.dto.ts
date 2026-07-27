import { IsUrl, IsEnum, IsOptional } from 'class-validator';
import { FeedSourceType } from '@prisma/client';

export class CreateFeedSourceDto {
  @IsUrl()
  url: string;

  @IsOptional()
  @IsEnum(FeedSourceType)
  type?: FeedSourceType;
}

