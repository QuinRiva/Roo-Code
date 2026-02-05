"use client"

import { Button } from "@/components/ui"
import { ArrowRight, Sparkles, Zap, Calendar, Mail, Plane, MessageCircle, Code, Bot } from "lucide-react"
import { EXTERNAL_LINKS } from "@/lib/constants"
import { useEffect, useState, useRef } from "react"

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

// Floating emoji component for the background chaos
function FloatingEmoji({
	emoji,
	delay,
	duration,
	startX,
	startY,
}: {
	emoji: string
	delay: number
	duration: number
	startX: number
	startY: number
}) {
	return (
		<div
			className="absolute text-6xl md:text-8xl pointer-events-none select-none animate-bounce opacity-20"
			style={{
				left: `${startX}%`,
				top: `${startY}%`,
				animationDelay: `${delay}s`,
				animationDuration: `${duration}s`,
			}}>
			{emoji}
		</div>
	)
}

// Particle explosion component
function ParticleExplosion({ active }: { active: boolean }) {
	const particles = Array.from({ length: 30 }, (_, i) => ({
		id: i,
		angle: (i * 12 * Math.PI) / 180,
		distance: 100 + Math.random() * 200,
		emoji: ["✨", "🚀", "💥", "⚡", "🔥", "💫", "🌟"][i % 7],
	}))

	if (!active) return null

	return (
		<div className="absolute inset-0 pointer-events-none overflow-hidden">
			{particles.map((p) => (
				<div
					key={p.id}
					className="absolute text-2xl animate-ping"
					style={{
						left: "50%",
						top: "50%",
						transform: `translate(-50%, -50%) translate(${Math.cos(p.angle) * p.distance}px, ${Math.sin(p.angle) * p.distance}px)`,
						animationDelay: `${p.id * 0.05}s`,
						animationDuration: "1s",
					}}>
					{p.emoji}
				</div>
			))}
		</div>
	)
}

export function OpenClawTakeover() {
	const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
	const [showExplosion, setShowExplosion] = useState(false)
	const [hypeLevel, setHypeLevel] = useState(0)
	const [showMessage, setShowMessage] = useState(false)
	const heroRef = useRef<HTMLElement>(null)

	// Track mouse for gradient effect
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (heroRef.current) {
				const rect = heroRef.current.getBoundingClientRect()
				setMousePos({
					x: ((e.clientX - rect.left) / rect.width) * 100,
					y: ((e.clientY - rect.top) / rect.height) * 100,
				})
			}
		}
		window.addEventListener("mousemove", handleMouseMove)
		return () => window.removeEventListener("mousemove", handleMouseMove)
	}, [])

	// Trigger explosion and hype on scroll
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowExplosion(true)
			setTimeout(() => setShowExplosion(false), 1500)
		}, 500)

		const hypeTimer = setInterval(() => {
			setHypeLevel((prev) => Math.min(prev + 1, 5))
		}, 800)

		const messageTimer = setTimeout(() => setShowMessage(true), 2000)

		return () => {
			clearTimeout(timer)
			clearInterval(hypeTimer)
			clearTimeout(messageTimer)
		}
	}, [])

	const handleHypeClick = () => {
		setShowExplosion(true)
		setHypeLevel((prev) => Math.min(prev + 2, 10))
		setTimeout(() => setShowExplosion(false), 1000)
	}

	return (
		<>
			{/* MEGA HERO SECTION - FULL SCREEN CHAOS */}
			<section
				ref={heroRef}
				className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
				{/* Crazy animated gradient background that follows mouse */}
				<div
					className="absolute inset-0 transition-all duration-300 ease-out"
					style={{
						background: `
							radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
							radial-gradient(circle at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
							radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 70%),
							linear-gradient(to bottom, hsl(var(--background)), hsl(var(--background)))
						`,
					}}
				/>

				{/* Floating emoji chaos in background */}
				<div className="absolute inset-0 overflow-hidden">
					<FloatingEmoji emoji="🦘" delay={0} duration={3} startX={10} startY={20} />
					<FloatingEmoji emoji="🦞" delay={0.5} duration={4} startX={85} startY={15} />
					<FloatingEmoji emoji="🚀" delay={1} duration={3.5} startX={20} startY={70} />
					<FloatingEmoji emoji="⚡" delay={1.5} duration={2.5} startX={75} startY={60} />
					<FloatingEmoji emoji="💻" delay={2} duration={4} startX={5} startY={45} />
					<FloatingEmoji emoji="🤖" delay={0.3} duration={3} startX={90} startY={80} />
					<FloatingEmoji emoji="🔥" delay={0.8} duration={3.5} startX={50} startY={85} />
					<FloatingEmoji emoji="✨" delay={1.2} duration={2.8} startX={30} startY={10} />
					<FloatingEmoji emoji="💥" delay={0.7} duration={4.2} startX={60} startY={25} />
				</div>

				{/* PARTICLE EXPLOSION */}
				<ParticleExplosion active={showExplosion} />

				{/* Pulsing rings */}
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<div
						className="absolute w-[600px] h-[600px] rounded-full border-2 border-violet-500/20 animate-ping"
						style={{ animationDuration: "3s" }}
					/>
					<div
						className="absolute w-[800px] h-[800px] rounded-full border border-blue-500/10 animate-ping"
						style={{ animationDuration: "4s", animationDelay: "1s" }}
					/>
					<div
						className="absolute w-[1000px] h-[1000px] rounded-full border border-purple-500/5 animate-ping"
						style={{ animationDuration: "5s", animationDelay: "2s" }}
					/>
				</div>

				{/* Main Content */}
				<div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
					{/* CRAZY BANNER */}
					<div
						className={`mb-6 transform transition-all duration-500 ${showMessage ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
						<div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 px-6 py-3 text-white font-bold animate-pulse shadow-lg shadow-purple-500/50">
							<Sparkles className="size-5 animate-spin" style={{ animationDuration: "3s" }} />
							<span className="text-lg">🚨 THIS IS NOT A DRILL 🚨</span>
							<Sparkles className="size-5 animate-spin" style={{ animationDuration: "3s" }} />
						</div>
					</div>

					{/* MEGA LOGOS */}
					<div className="flex items-center justify-center gap-4 md:gap-8 mb-8">
						<div
							className="flex flex-col items-center group cursor-pointer"
							onClick={handleHypeClick}
							role="button"
							tabIndex={0}
							onKeyDown={(e) => e.key === "Enter" && handleHypeClick()}>
							<div
								className={`size-28 md:size-36 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-violet-700 flex items-center justify-center shadow-2xl shadow-violet-500/50 transform transition-all duration-300 hover:scale-110 hover:rotate-6 ${hypeLevel > 2 ? "animate-bounce" : ""}`}>
								<span className="text-7xl md:text-8xl">🦘</span>
							</div>
							<span className="text-lg font-bold mt-3 bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
								Roo Code
							</span>
						</div>

						{/* EPIC PLUS SIGN */}
						<div className="flex flex-col items-center">
							<div
								className={`text-5xl md:text-7xl font-black bg-gradient-to-r from-violet-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse ${hypeLevel > 3 ? "animate-spin" : ""}`}
								style={{ animationDuration: hypeLevel > 3 ? "2s" : "1s" }}>
								×
							</div>
						</div>

						<div
							className="flex flex-col items-center group cursor-pointer"
							onClick={handleHypeClick}
							role="button"
							tabIndex={0}
							onKeyDown={(e) => e.key === "Enter" && handleHypeClick()}>
							<div
								className={`size-28 md:size-36 rounded-3xl bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-700 flex items-center justify-center shadow-2xl shadow-blue-500/50 transform transition-all duration-300 hover:scale-110 hover:-rotate-6 ${hypeLevel > 2 ? "animate-bounce" : ""}`}
								style={{ animationDelay: "0.2s" }}>
								<span className="text-7xl md:text-8xl">🦞</span>
							</div>
							<span className="text-lg font-bold mt-3 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
								OpenClaw
							</span>
						</div>
					</div>

					{/* INSANE HEADLINE */}
					<h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter max-w-6xl mb-6">
						<span className="block bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
							CODING AI
						</span>
						<span className="block text-4xl md:text-5xl lg:text-6xl text-muted-foreground my-2">meets</span>
						<span className="block bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent animate-pulse">
							DOING AI
						</span>
					</h1>

					{/* HYPE METER */}
					<div className="mb-8 flex items-center gap-2">
						<span className="text-sm text-muted-foreground">Hype Level:</span>
						<div className="flex gap-1">
							{Array.from({ length: 10 }, (_, i) => (
								<div
									key={i}
									className={`w-4 h-6 rounded transition-all duration-300 ${
										i < hypeLevel
											? "bg-gradient-to-t from-violet-500 to-pink-500 scale-110"
											: "bg-muted"
									}`}
								/>
							))}
						</div>
						<span className="text-sm font-bold text-violet-500">{hypeLevel * 10}%</span>
					</div>

					{/* Sub-headline with attitude */}
					<p className="mt-2 max-w-3xl text-xl md:text-2xl text-muted-foreground mb-6">
						<span className="font-bold text-foreground">Roo Code</span> writes your code.
						<br />
						<span className="font-bold text-foreground">OpenClaw</span> does your chores.
						<br />
						<span className="text-lg italic">Together? Unstoppable. 🔥</span>
					</p>

					{/* OpenClaw Capabilities with animation */}
					<div className="flex flex-wrap justify-center gap-3 mb-10">
						{OPENCLAW_CAPABILITIES.map((cap, idx) => {
							const Icon = cap.icon
							return (
								<div
									key={cap.label}
									className="flex items-center gap-2 rounded-full bg-card/80 backdrop-blur border border-blue-500/30 px-4 py-2 text-sm transform hover:scale-105 transition-all hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
									style={{ animationDelay: `${idx * 0.1}s` }}>
									<Icon className="size-4 text-blue-500" />
									<span className="text-muted-foreground">{cap.label}</span>
								</div>
							)
						})}
					</div>

					{/* MEGA CTA BUTTONS */}
					<div className="flex flex-col sm:flex-row gap-4 mb-8">
						<Button
							size="xl"
							className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 hover:from-violet-500 hover:via-purple-500 hover:to-blue-500 text-white border-0 shadow-xl shadow-purple-500/30 transform hover:scale-105 transition-all text-lg px-10"
							onClick={handleHypeClick}>
							<a
								href="https://openclaw.ai"
								target="_blank"
								rel="noreferrer"
								className="flex items-center justify-center gap-2">
								<span>🦞</span>
								Explore OpenClaw
								<ArrowRight className="size-5" />
							</a>
						</Button>
						<Button
							size="xl"
							className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white border-0 shadow-xl shadow-violet-500/30 transform hover:scale-105 transition-all text-lg px-10"
							onClick={handleHypeClick}>
							<a
								href={EXTERNAL_LINKS.CLOUD_APP_SIGNUP_HOME}
								className="flex items-center justify-center gap-2">
								<span>🦘</span>
								Start with Roo Code
								<ArrowRight className="size-5" />
							</a>
						</Button>
					</div>

					{/* Click for more hype text */}
					<p className="text-xs text-muted-foreground animate-pulse">👆 Click the logos for more hype 👆</p>
				</div>

				{/* Scroll indicator */}
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
					<div className="flex flex-col items-center gap-2 text-muted-foreground">
						<span className="text-sm">Keep scrolling for more</span>
						<ArrowRight className="size-5 rotate-90" />
					</div>
				</div>
			</section>

			{/* Integration Features Section - Still dramatic but more readable */}
			<section className="py-24 bg-muted/30 relative overflow-hidden">
				<div className="absolute inset-0">
					<div className="absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-violet-500/10 blur-[120px]" />
					<div className="absolute right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
				</div>
				<div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
							<span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
								Better Together
							</span>
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Two AI powerhouses. One unstoppable workflow.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						{INTEGRATION_FEATURES.map((feature, idx) => {
							const Icon = feature.icon
							return (
								<div
									key={feature.title}
									className="rounded-3xl bg-card border-2 border-transparent hover:border-violet-500/50 shadow-xl p-8 group transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-2"
									style={{ animationDelay: `${idx * 0.1}s` }}>
									<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 mb-6 group-hover:scale-110 transition-transform">
										<Icon className="size-8 text-white" />
									</div>
									<h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
									<p className="text-muted-foreground">{feature.description}</p>
								</div>
							)
						})}
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="py-24 relative">
				<div className="container px-4 mx-auto sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
							From <span className="text-blue-500">Chat</span> to{" "}
							<span className="text-violet-500">Code</span> to{" "}
							<span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
								Action
							</span>
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Watch the magic happen in three simple steps.
						</p>
					</div>

					<div className="max-w-5xl mx-auto">
						<div className="grid md:grid-cols-3 gap-6">
							{/* Step 1 */}
							<div className="relative group">
								<div className="rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/20 p-8 h-full hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/10">
									<div className="flex items-center gap-3 mb-6">
										<div className="size-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-black text-xl">
											1
										</div>
										<MessageCircle className="size-8 text-blue-500" />
									</div>
									<h3 className="text-xl font-bold mb-3">Message OpenClaw</h3>
									<p className="text-muted-foreground italic">
										&quot;Build me a bot that checks my inbox every hour and summarizes new
										emails&quot;
									</p>
								</div>
								<div className="hidden md:flex absolute top-1/2 -right-3 text-muted-foreground items-center justify-center size-6 rounded-full bg-muted">
									<ArrowRight className="size-4" />
								</div>
							</div>

							{/* Step 2 */}
							<div className="relative group">
								<div className="rounded-3xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-2 border-violet-500/20 p-8 h-full hover:border-violet-500/50 transition-all hover:shadow-xl hover:shadow-violet-500/10">
									<div className="flex items-center gap-3 mb-6">
										<div className="size-12 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-white font-black text-xl">
											2
										</div>
										<Code className="size-8 text-violet-500" />
									</div>
									<h3 className="text-xl font-bold mb-3">Roo Code Creates</h3>
									<p className="text-muted-foreground">
										Roo Code agents write, test, and deploy the integration code automatically.
									</p>
								</div>
								<div className="hidden md:flex absolute top-1/2 -right-3 text-muted-foreground items-center justify-center size-6 rounded-full bg-muted">
									<ArrowRight className="size-4" />
								</div>
							</div>

							{/* Step 3 */}
							<div className="relative group">
								<div className="rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/20 p-8 h-full hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10">
									<div className="flex items-center gap-3 mb-6">
										<div className="size-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-xl">
											3
										</div>
										<Zap className="size-8 text-purple-500" />
									</div>
									<h3 className="text-xl font-bold mb-3">Automation Runs</h3>
									<p className="text-muted-foreground">
										Your custom bot runs 24/7, delivering summaries right to your chat. 🎉
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA - MAXIMUM HYPE */}
			<section className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
				<div className="absolute inset-0">
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-violet-500/20 to-blue-500/20 blur-[100px]" />
				</div>
				<div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
							Ready to go{" "}
							<span className="bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
								absolutely unhinged?
							</span>
						</h2>
						<p className="text-xl text-muted-foreground mb-10">
							Join thousands of developers who&apos;ve already lost their minds over this integration.
							<br />
							<span className="text-sm italic">(in the best way possible)</span>
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="xl"
								className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white border-0 shadow-xl shadow-violet-500/30 transform hover:scale-105 transition-all text-lg px-10">
								<a
									href={EXTERNAL_LINKS.CLOUD_APP_SIGNUP_HOME}
									className="flex items-center justify-center gap-2">
									🦘 Get Started with Roo Code
									<ArrowRight className="size-5" />
								</a>
							</Button>
							<Button
								size="xl"
								className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-0 shadow-xl shadow-blue-500/30 transform hover:scale-105 transition-all text-lg px-10">
								<a
									href="https://openclaw.ai"
									target="_blank"
									rel="noreferrer"
									className="flex items-center justify-center gap-2">
									🦞 Visit OpenClaw.ai
									<ArrowRight className="size-5" />
								</a>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
