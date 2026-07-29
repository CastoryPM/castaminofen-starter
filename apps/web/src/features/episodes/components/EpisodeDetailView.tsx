'use client';

import { Play, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePlayerRuntime } from '@/features/player';
import { mapEpisodeToPlayableItem } from '@/features/player/adapters/episodeToPlayable';
import type { Episode } from '@/lib/types';
import { EpisodeAudioUploadCard } from './EpisodeAudioUploadCard';
import type { ChangeEvent } from 'react';

export type EpisodeDetailViewProps = {
  episode: Episode;
  selectedFile: File | null;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  isUploading: boolean;
  uploadError?: string | null;
  uploadSuccess: boolean;
};

export function EpisodeDetailView({
  episode,
  selectedFile,
  onFileChange,
  onUpload,
  isUploading,
  uploadError,
  uploadSuccess,
}: EpisodeDetailViewProps) {
  const playerRuntime = usePlayerRuntime();

  const handlePlay = async () => {
    await playerRuntime.loadItem(mapEpisodeToPlayableItem(episode));
  };

  const handleAddToQueue = () => {
    playerRuntime.appendToQueue(mapEpisodeToPlayableItem(episode));
  };

  return (
    <main className="page-container">
      <section className="card">
        <div className="header">
          <div>
            <h1>{episode.title}</h1>
            <p>{episode.description || 'No description available.'}</p>
          </div>
        </div>
        <div className="field-row">
          <Card>
            <p>
              <strong>Podcast ID:</strong> {episode.podcastId}
            </p>
            <p>
              <strong>Published At:</strong> {episode.publishedAt || 'Draft'}
            </p>
            <p>
              <strong>Audio URL:</strong> {episode.audioUrl || 'Not uploaded'}
            </p>
            {episode.audioUrl ? (
              <>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button type="button" variant="secondary" onClick={() => void handlePlay()}>
                    <span className="flex items-center gap-2">
                      <Play className="h-4 w-4" aria-hidden="true" />
                      پخش اپیزود
                    </span>
                  </Button>
                  <Button type="button" variant="ghost" onClick={handleAddToQueue}>
                    <span className="flex items-center gap-2">
                      <Plus className="h-4 w-4" aria-hidden="true" />
                      افزودن به صف
                    </span>
                  </Button>
                </div>
                <p className="form-message mt-3">Audio is available and can be played from the player surface in the app shell.</p>
              </>
            ) : (
              <p className="form-message">Audio is not available yet.</p>
            )}
          </Card>
          <EpisodeAudioUploadCard
            selectedFile={selectedFile}
            onFileChange={onFileChange}
            onUpload={onUpload}
            isUploading={isUploading}
            uploadError={uploadError}
            uploadSuccess={uploadSuccess}
          />
        </div>
      </section>
    </main>
  );
}
