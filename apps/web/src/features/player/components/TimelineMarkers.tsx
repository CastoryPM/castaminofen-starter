import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Bookmark, BookOpen, MessageCircleMore, Sparkles, Star, WandSparkles } from 'lucide-react';
import { formatTime } from '../utils/playerPresentation';

export type TimelineMarkerType = 'bookmark' | 'highlight' | 'discussion' | 'chapter' | 'recommendation' | 'creator-note' | 'ai-summary';

export type TimelineMarkerItem = {
  id: string;
  label: string;
  timestamp: number;
  type: TimelineMarkerType;
  colorToken?: string;
  description?: string;
  selected?: boolean;
};

type TimelineMarkersProps = {
  markers: TimelineMarkerItem[];
  selectedMarkerId?: string;
  onSelectMarker?: (marker: TimelineMarkerItem) => void;
};

const markerIcons: Record<TimelineMarkerType, ReactNode> = {
  bookmark: <Bookmark size={12} />,
  highlight: <Star size={12} />,
  discussion: <MessageCircleMore size={12} />,
  chapter: <BookOpen size={12} />,
  recommendation: <Sparkles size={12} />,
  'creator-note': <WandSparkles size={12} />,
  'ai-summary': <Sparkles size={12} />,
};

export function TimelineMarkers({ markers, selectedMarkerId, onSelectMarker }: TimelineMarkersProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="مارکرهای زمان">
      {markers.map((marker) => {
        const isSelected = marker.id === selectedMarkerId || marker.selected;
        return (
          <button
            key={marker.id}
            type="button"
            className={clsx(
              'flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all',
              isSelected
                ? 'border-accent/30 bg-accent/10 text-accent shadow-sm'
                : 'border-border/70 bg-surface-secondary/80 text-text-secondary hover:border-accent/20 hover:text-text-primary',
            )}
            data-selected={isSelected}
            onClick={() => onSelectMarker?.(marker)}
            aria-label={`${marker.label} در ${formatTime(marker.timestamp)}`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-card/80">{markerIcons[marker.type]}</span>
            <span>{formatTime(marker.timestamp)} · {marker.label}</span>
          </button>
        );
      })}
    </div>
  );
}
