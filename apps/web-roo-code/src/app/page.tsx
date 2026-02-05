import {
	CompanyLogos,
	FAQSection,
	Testimonials,
	CTASection,
	OptionOverviewSection,
	PillarsSection,
	UseExamplesSection,
	OpenClawTakeover,
} from "@/components/homepage"
import { StructuredData } from "@/components/structured-data"

// Invalidate cache when a request comes in, at most once every hour.
export const revalidate = 3600

// Toggle this to enable/disable the OpenClaw homepage takeover
const OPENCLAW_TAKEOVER_ENABLED = true

export default async function Home() {
	if (OPENCLAW_TAKEOVER_ENABLED) {
		return (
			<>
				<StructuredData />
				<OpenClawTakeover />
				{/* Include key sections below the takeover */}
				<div className="border-t border-border/50">
					<div className="py-12 bg-muted/20">
						<div className="container px-4 mx-auto text-center">
							<p className="text-sm text-muted-foreground mb-4">
								Trusted by developers at leading companies worldwide
							</p>
							<CompanyLogos />
						</div>
					</div>
				</div>
				<PillarsSection />
				<OptionOverviewSection />
				<UseExamplesSection />
				<Testimonials />
				<FAQSection />
				<CTASection />
			</>
		)
	}

	// Original homepage content (when takeover is disabled)
	return (
		<>
			<StructuredData />
			<section className="relative flex flex-col items-center overflow-hidden pt-20 pb-12 md:pt-32 md:pb-16">
				<div className="absolute inset-y-0 left-1/2 h-full w-full max-w-[1200px] -translate-x-1/2 z-1">
					<div className="absolute left-1/2 top-1/2 h-[400px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 dark:bg-violet-700/20 blur-[140px]" />
				</div>
				<div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
					<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground max-w-4xl mb-6">
						Your AI Software Engineering Team is here.
						<br />
						<span className="text-muted-foreground">Interactive in the IDE, autonomous in the cloud.</span>
					</h1>
					<div className="mt-2 max-w-3xl text-lg text-muted-foreground mb-10 space-y-3">
						<p>
							Use the <strong className="text-nowrap">Roo Code Extension</strong> on your computer for
							full control, or delegate work to your{" "}
							<strong className="text-nowrap">Roo Code Cloud Agents</strong> from the web, Slack, Github
							or wherever your team is.
						</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-4 mb-16">
						<div className="flex flex-col items-center gap-2">
							<a
								href="https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline"
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/80 h-14 px-8">
								Install VS Code Extension
							</a>
							<span className="text-xs text-muted-foreground">Free and Open Source</span>
						</div>

						<div className="flex flex-col items-center gap-2">
							<a
								href="https://app.roocode.com/sign-up?redirect_url=/cloud-agents/setup"
								className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/80 h-14 px-8">
								Try Cloud for Free
							</a>
							<span className="text-xs text-muted-foreground">No credit card needed</span>
						</div>
					</div>

					<div className="mb-12 px-4">
						<CompanyLogos />
					</div>
				</div>
			</section>

			<PillarsSection />
			<OptionOverviewSection />
			<UseExamplesSection />
			<Testimonials />
			<FAQSection />
			<CTASection />
		</>
	)
}
