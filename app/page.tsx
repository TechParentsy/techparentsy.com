import { BrandMark } from '@/components/BrandMark';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { EpisodeCard } from '@/components/EpisodeCard';
import { GlassCard } from '@/components/GlassCard';
import { LayersSection } from '@/components/LayersSection';
import { SectionHeading } from '@/components/SectionHeading';
import { TakeawayForm } from '@/components/TakeawayForm';
import { ThemeToggle } from '@/components/ThemeToggle';

const layerCards = [
  {
    title: 'Device',
    description:
      'Start with what is physically in your home: phones, tablets, gaming systems, and laptops. Simple defaults and schedules reduce daily friction quickly.',
  },
  {
    title: 'Network',
    description:
      'Your router can add household-level guardrails across every connected device. This creates consistency when app-level tools behave differently.',
  },
  {
    title: 'Identity',
    description:
      'Accounts, passwords, and sign-ins shape what children can access and when. Tightening identity settings prevents most accidental workarounds.',
  },
  {
    title: 'Conversation',
    description:
      'Technology plans work best when expectations are explicit, repeatable, and calm. Clear conversations keep trust intact while limits stay firm.',
  },
];

export default function HomePage() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/55 backdrop-blur-lg dark:border-white/10 dark:bg-slate-950/60">
        <Container className="flex h-20 items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3" aria-label="TechParentsy home">
            <BrandMark src="/brand/mark_logo.png" className="h-11 w-11" />
            <span className="hidden text-sm font-semibold tracking-wide text-tp-slate sm:inline">
              TechParentsy
            </span>
          </a>
          <div className="flex items-center gap-2 md:gap-6">
            <nav className="hidden items-center gap-6 text-sm text-tp-muted md:flex" aria-label="Main">
              <a href="#podcast" className="hover:text-tp-ink">
                Podcast
              </a>
              <a href="#about" className="hover:text-tp-ink">
                About
              </a>
              <Button href="#takeaway" variant="secondary" className="px-4 py-2 text-sm">
                Get this week's practical step
              </Button>
            </nav>
            <nav className="flex items-center gap-3 text-xs text-tp-muted md:hidden" aria-label="Mobile">
              <a href="#podcast" className="font-medium hover:text-tp-ink">
                Podcast
              </a>
              <a href="#about" className="font-medium hover:text-tp-ink">
                About
              </a>
              <a href="#takeaway" className="font-medium text-tp-teal hover:text-tp-ink">
                Practical step
              </a>
            </nav>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <main id="top" className="pb-20">
        <section className="pt-16 pb-10 sm:pt-20 sm:pb-12">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="hero-fade-in">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-tp-muted">
                  TechParentsy Podcast
                </p>
                <h1 className="tp-h1">
                  Empowering parents with technology.
                </h1>
                <p className="tp-body mt-6 text-pretty">
                  Transparent tools and guardrails for families navigating the digital world.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="#podcast">Listen to the Podcast</Button>
                  <Button href="#takeaway" variant="secondary">
                    Get this week's practical step
                  </Button>
                </div>
              </div>
              <GlassCard className="hero-fade-in-delay relative overflow-hidden p-10 sm:p-12">
                <div className="pointer-events-none absolute -left-24 -top-16 h-56 w-56 rounded-full bg-teal-300/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-slate-300/50 blur-3xl" />
                <div className="relative flex min-h-64 items-center justify-center rounded-[1.1rem] border border-white/70 bg-white/45 p-8 dark:border-white/10 dark:bg-slate-900/45 sm:min-h-[22rem]">
                  {/* TODO: Replace with /public/brand/wordmark.png if preferred for hero visual. */}
                  <BrandMark src="/brand/mark.png" darkSrc="/brand/mark_dark.png" className="h-52 w-52 sm:h-64 sm:w-64" />
                </div>
              </GlassCard>
            </div>
          </Container>
        </section>

        <section className="pt-20 pb-8 sm:pt-24 sm:pb-10">
          <Container>
            <GlassCard className="space-y-6">
              <SectionHeading
                title="Businesses get enterprise-grade tools. Parents get limited controls."
                className="max-w-none"
              />
              <p className="tp-body max-w-none">
                Platforms ship powerful management tools to companies.
              </p>
              <p className="tp-body max-w-none">
                Parents are left with simplified controls that can feel buggy, inconsistent, and hard
                to apply in real life.
              </p>
              <p className="text-lg font-medium text-tp-slate">
                TechParentsy exists to close that gap - with clarity and guardrails.
              </p>
            </GlassCard>
          </Container>
        </section>

        <section id="about" className="pt-20 pb-8 sm:pt-24 sm:pb-10">
          <Container>
            <GlassCard>
              <SectionHeading title="Hi, I'm Jake." className="mb-4 max-w-none" />
              <div className="space-y-4">
                <p className="tp-body max-w-none">
                  I am a dad of three and have spent nearly two decades in IT and cybersecurity,
                  helping teams navigate risk without panic.
                </p>
                <p className="tp-body max-w-none">
                  TechParentsy brings that same enterprise-grade clarity into family life, so parents
                  can make confident, practical decisions at home.
                </p>
              </div>
            </GlassCard>
          </Container>
        </section>

        <section id="podcast" className="pt-20 pb-8 sm:pt-24 sm:pb-10">
          <Container>
            <SectionHeading eyebrow="Podcast" title="Start here" className="mb-10" />
            <div className="grid gap-4 md:grid-cols-2">
              <EpisodeCard
                title="Episode 1: Why TechParentsy Exists"
                summary="This opening episode explains the core problem: families are expected to manage high-stakes technology with tools that were never designed for real household life. It introduces the calm, practical framework behind the show."
              />
              <EpisodeCard
                title="Episode 2: Why Parental Controls Feel Inconsistent"
                summary="A breakdown of why settings differ across platforms and why results can feel random week to week. You will leave with a clearer mental model and better expectations before changing another setting."
              />
            </div>
          </Container>
        </section>

        <LayersSection cards={layerCards} />

        <section className="pt-20 pb-8 sm:pt-24 sm:pb-10">
          <Container>
            <GlassCard>
              <SectionHeading title="If you do nothing else this week...">
                <p>
                  Every episode ends with one practical step you can take this week - even if you
                  do not change anything else.
                </p>
              </SectionHeading>
            </GlassCard>
          </Container>
        </section>

        <section id="takeaway" className="pt-20 pb-8 sm:pt-24 sm:pb-10">
          <Container>
            <GlassCard>
              <SectionHeading title="Get this week's practical step" className="mb-6">
                <p>One practical step each week. No spam. Unsubscribe anytime.</p>
              </SectionHeading>
              <TakeawayForm />
            </GlassCard>
          </Container>
        </section>
      </main>

      <footer className="border-t border-white/60 py-10 dark:border-white/10">
        <Container className="flex flex-col gap-4 text-sm text-tp-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} TechParentsy</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-tp-ink">
              Privacy
            </a>
            <a href="mailto:hello@techparentsy.com" className="hover:text-tp-ink">
              Contact
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-tp-ink">
              Apple Podcasts
            </a>
            <a href="#" className="hover:text-tp-ink">
              Spotify
            </a>
            <a href="#" className="hover:text-tp-ink">
              YouTube
            </a>
            <a href="#" className="hover:text-tp-ink">
              RSS
            </a>
          </div>
        </Container>
      </footer>
    </>
  );
}
