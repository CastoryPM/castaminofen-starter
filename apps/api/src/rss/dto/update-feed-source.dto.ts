import { IsUrl, IsOptional } from 'class-validator';

export class UpdateFeedSourceDto {
  @IsOptional()
  @IsUrl()
  url?: string;
}
