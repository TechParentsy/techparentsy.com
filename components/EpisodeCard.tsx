import { Button } from './Button';
import { GlassCard } from './GlassCard';

type EpisodeCardProps = {
  title: string;
  summary: string;
};

const platforms = ['Apple Podcasts', 'Spotify', 'YouTube', 'RSS'];

export function EpisodeCard({ title, summary }: EpisodeCardProps) {
  return (
    <GlassCard className="h-full">
      <h3 className="text-xl font-semibold text-tp-ink">{title}</h3>
      <p className="mt-3 leading-relaxed text-tp-muted">{summary}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <Button
            key={platform}
            variant="disabled"
            disabled
            title="Coming soon"
            className="px-3 py-2 text-xs"
          >
            {platform}
          </Button>
        ))}
      </div>
    </GlassCard>
  );
}
