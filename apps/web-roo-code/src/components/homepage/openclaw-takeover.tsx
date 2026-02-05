"use client"

import { Button } from "@/components/ui"
import { ArrowRight, Code, MessageCircle, Sparkles, Zap, Calendar, Mail, Plane, Bot } from "lucide-react"
import Image from "next/image"
import { EXTERNAL_LINKS } from "@/lib/constants"

const OPENCLAW_CAPABILITIES = [
	{ icon: Mail, label: "Clears your inbox" },
	{ icon: Calendar, label: "Manages your calendar" },
	{ icon: Plane, label: "Checks you in for flights" },
	{ icon: MessageCircle, label: "Works from WhatsApp, Telegram, or any chat" },
]

const INTEGRATION_FEATURES = [
	{
		icon: Code,
		title: "Code Meets Conversation",
		description:
			"Build custom OpenClaw integrations with Roo Code. Create bots that understand context and execute complex tasks.",
	},
	{
		icon: Zap,
		title: "Automate Everything",
		description:
			"Combine Roo Code's software engineering capabilities with OpenClaw's real-world actions for end-to-end automation.",
	},
	{
		icon: Bot,
		title: "Deploy AI Agents",
		description:
			"Use Roo Code Cloud to develop and deploy intelligent agents that work seamlessly with OpenClaw's messaging platform.",
	},
]

export function OpenClawTakeover() {
	return (
		<>
			{/* Hero Section - Full Takeover */}
			<section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-16 pb-12">
				{/* Animated Background */}
				<div className="absolute inset-0 overflow-hidden">
					{/* Primary gradient - violet from Roo */}
					<div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-violet-500/20 dark:bg-violet-700/30 blur-[120px] animate-pulse" />
					{/* Secondary gradient - blue for OpenClaw */}
					<div className="absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/20 dark:bg-blue-600/30 blur-[100px] animate-pulse delay-1000" />
					{/* Connecting gradient in the middle */}
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[800px] rounded-full bg-gradient-to-r from-violet-500/10 via-purple-500/15 to-blue-500/10 dark:from-violet-700/20 dark:via-purple-600/25 dark:to-blue-600/20 blur-[80px]" />
				</div>

				{/* Featured Partnership Badge */}
				<div className="relative z-10 mb-8">
					<div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20 px-4 py-2 text-sm font-medium">
						<Sparkles className="size-4 text-violet-500" />
						<span className="text-foreground">Featured Integration</span>
						<span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent font-semibold">
							Roo Code x OpenClaw
						</span>
					</div>
				</div>

				{/* Main Content */}
				<div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
					{/* Logos */}
					<div className="flex items-center justify-center gap-6 mb-8">
						<div className="flex flex-col items-center">
							<Image
								src="/RooCode-Badge-blk.svg"
								alt="Roo Code"
								width={80}
								height={80}
								className="dark:hidden"
							/>
							<Image
								src="/RooCode-Badge-white.svg"
								alt="Roo Code"
								width={80}
								height={80}
								className="hidden dark:block"
							/>
							<span className="text-sm font-semibold mt-2">Roo Code</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-3xl text-muted-foreground">+</span>
						</div>
						<div className="flex flex-col items-center">
							<div className="size-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
								<span className="text-3xl">🦞</span>
							</div>
							<span className="text-sm font-semibold mt-2">OpenClaw</span>
						</div>
					</div>

					{/* Headline */}
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-5xl mb-6">
						AI that codes{" "}
						<span className="bg-gradient-to-r from-violet-500 to-violet-700 bg-clip-text text-transparent">
							+
						</span>{" "}
						AI that acts
						<br />
						<span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl">
							Build the future of automation together.
						</span>
					</h1>

					{/* Sub-headline */}
					<p className="mt-4 max-w-3xl text-lg md:text-xl text-muted-foreground mb-8">
						Combine <strong className="text-foreground">Roo Code&apos;s</strong> AI software engineering
						with <strong className="text-foreground">OpenClaw&apos;s</strong> real-world AI assistant.
						<br />
						<span className="text-base">
							Create powerful automations that go from code to action, all through natural conversation.
						</span>
					</p>

					{/* OpenClaw Capabilities */}
					<div className="flex flex-wrap justify-center gap-4 mb-10">
						{OPENCLAW_CAPABILITIES.map((cap) => {
							const Icon = cap.icon
							return (
								<div
									key={cap.label}
									className="flex items-center gap-2 rounded-full bg-card border px-4 py-2 text-sm">
									<Icon className="size-4 text-blue-500" />
									<span className="text-muted-foreground">{cap.label}</span>
								</div>
							)
						})}
					</div>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 mb-12">
						<Button
							size="xl"
							className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white border-0">
							<a
								href="https://openclaw.ai"
								target="_blank"
								rel="noreferrer"
								className="flex items-center justify-center">
								Explore OpenClaw
								<ArrowRight className="ml-2 size-5" />
							</a>
						</Button>
						<Button size="xl" variant="outline">
							<a href={EXTERNAL_LINKS.CLOUD_APP_SIGNUP_HOME} className="flex items-center justify-center">
								Start Building with Roo Code
								<ArrowRight className="ml-2 size-5" />
							</a>
						</Button>
					</div>
				</div>
			</section>

			{/* Integration Features Section */}
			<section className="py-20 bg-muted/30 relative">
				<div className="absolute inset-y-0 left-1/2 h-full w-full max-w-[1200px] -translate-x-1/2">
					<div className="absolute left-1/2 top-1/2 h-[600px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 dark:bg-purple-700/20 blur-[140px]" />
				</div>
				<div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
							Better Together: Roo Code + OpenClaw
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Two powerful AI systems, working in harmony to automate your digital life.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						{INTEGRATION_FEATURES.map((feature) => {
							const Icon = feature.icon
							return (
								<div
									key={feature.title}
									className="rounded-2xl bg-card outline outline-border/50 hover:outline-4 shadow-lg p-8 group transition-all hover:shadow-2xl">
									<div className="inline-flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 mb-4">
										<Icon className="size-6 text-violet-600" />
									</div>
									<h3 className="text-xl font-bold mb-2">{feature.title}</h3>
									<p className="text-muted-foreground">{feature.description}</p>
								</div>
							)
						})}
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="py-20 relative">
				<div className="container px-4 mx-auto sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
							From Chat to Code to Action
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							See how the integration creates a seamless workflow.
						</p>
					</div>

					<div className="max-w-4xl mx-auto">
						<div className="grid md:grid-cols-3 gap-4">
							{/* Step 1 */}
							<div className="relative">
								<div className="rounded-2xl bg-card border p-6 h-full">
									<div className="flex items-center gap-3 mb-4">
										<div className="size-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
											1
										</div>
										<MessageCircle className="size-5 text-blue-500" />
									</div>
									<h3 className="font-semibold mb-2">Message OpenClaw</h3>
									<p className="text-sm text-muted-foreground">
										&quot;Build me a bot that checks my inbox every hour and summarizes new
										emails&quot;
									</p>
								</div>
								<div className="hidden md:block absolute top-1/2 -right-2 text-muted-foreground">
									<ArrowRight className="size-4" />
								</div>
							</div>

							{/* Step 2 */}
							<div className="relative">
								<div className="rounded-2xl bg-card border p-6 h-full">
									<div className="flex items-center gap-3 mb-4">
										<div className="size-8 rounded-full bg-violet-500 flex items-center justify-center text-white font-bold text-sm">
											2
										</div>
										<Code className="size-5 text-violet-500" />
									</div>
									<h3 className="font-semibold mb-2">Roo Code Creates</h3>
									<p className="text-sm text-muted-foreground">
										Roo Code agents write, test, and deploy the integration code automatically.
									</p>
								</div>
								<div className="hidden md:block absolute top-1/2 -right-2 text-muted-foreground">
									<ArrowRight className="size-4" />
								</div>
							</div>

							{/* Step 3 */}
							<div className="relative">
								<div className="rounded-2xl bg-card border p-6 h-full">
									<div className="flex items-center gap-3 mb-4">
										<div className="size-8 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
											3
										</div>
										<Zap className="size-5 text-purple-500" />
									</div>
									<h3 className="font-semibold mb-2">Automation Runs</h3>
									<p className="text-sm text-muted-foreground">
										Your custom bot runs 24/7, delivering summaries right to your chat.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="py-20 bg-gradient-to-b from-background to-muted/30">
				<div className="container px-4 mx-auto sm:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
							Ready to Build Something Amazing?
						</h2>
						<p className="text-xl text-muted-foreground mb-8">
							Join the growing community of developers combining AI coding with AI automation.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="xl">
								<a
									href={EXTERNAL_LINKS.CLOUD_APP_SIGNUP_HOME}
									className="flex items-center justify-center">
									Get Started with Roo Code
									<ArrowRight className="ml-2 size-5" />
								</a>
							</Button>
							<Button size="xl" variant="outline">
								<a
									href="https://openclaw.ai"
									target="_blank"
									rel="noreferrer"
									className="flex items-center justify-center">
									Visit OpenClaw.ai
									<ArrowRight className="ml-2 size-5" />
								</a>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
