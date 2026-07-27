'use client';

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
                <Button type="button" variant="secondary" className="mt-3" onClick={() => void handlePlay()}>
                  Play Episode
                </Button>
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
