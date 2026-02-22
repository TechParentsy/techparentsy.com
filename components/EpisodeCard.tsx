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
      <p className="mb-3 inline-flex rounded-full border border-tp-line bg-white/75 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-tp-muted dark:bg-slate-900/70">
        Coming soon
      </p>
      <h3 className="tp-h3">{title}</h3>
      <p className="tp-body mt-3">{summary}</p>
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
      <p className="tp-small mt-3 md:hidden">Coming soon</p>
    </GlassCard>
  );
}
