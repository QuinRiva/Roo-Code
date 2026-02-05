"use client"

import { Button } from "@/components/ui"
import { ArrowRight, Sparkles, Zap, Calendar, Mail, Plane, MessageCircle, Code, Bot, Rocket } from "lucide-react"
import { EXTERNAL_LINKS } from "@/lib/constants"
import { useEffect, useState, useRef, useCallback } from "react"

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

const HYPE_MESSAGES = [
	"THEY DID WHAT?!",
	"NO WAY THIS IS REAL",
	"ABSOLUTE MADLADS",
	"INJECT THIS INTO MY VEINS",
	"SHUT UP AND TAKE MY MONEY",
	"I'M NOT CRYING, YOU'RE CRYING",
	"THIS IS THE WAY",
	"WITNESS ME",
	"HYPE TRAIN HAS NO BRAKES",
	"WE'RE SO BACK",
	"LET'S GOOOOO",
]

const CONFETTI_COLORS = [
	"#8b5cf6", // violet
	"#3b82f6", // blue
	"#ec4899", // pink
	"#f59e0b", // amber
	"#10b981", // emerald
	"#ef4444", // red
]

// Floating emoji component with more chaos
function FloatingEmoji({
	emoji,
	delay,
	duration,
	startX,
	startY,
	size = "text-6xl md:text-8xl",
}: {
	emoji: string
	delay: number
	duration: number
	startX: number
	startY: number
	size?: string
}) {
	return (
		<div
			className={`absolute ${size} pointer-events-none select-none opacity-30 openclaw-float-animation animate-spin`}
			style={{
				left: `${startX}%`,
				top: `${startY}%`,
				animationDuration: `${duration}s, ${duration * 2}s`,
				animationDelay: `${delay}s`,
			}}>
			{emoji}
		</div>
	)
}

// CONFETTI EXPLOSION!
function ConfettiPiece({
	color,
	startX,
	startY,
	angle,
	velocity,
}: {
	color: string
	startX: number
	startY: number
	angle: number
	velocity: number
}) {
	const [pos, setPos] = useState({ x: startX, y: startY, rotation: 0 })
	const [opacity, setOpacity] = useState(1)

	useEffect(() => {
		let frame: number
		let time = 0
		const gravity = 0.5
		const vx = Math.cos(angle) * velocity
		let vy = Math.sin(angle) * velocity

		const animate = () => {
			time += 1
			vy += gravity
			setPos((prev) => ({
				x: prev.x + vx,
				y: prev.y + vy,
				rotation: prev.rotation + 15,
			}))
			setOpacity((prev) => Math.max(0, prev - 0.02))

			if (time < 100 && opacity > 0) {
				frame = requestAnimationFrame(animate)
			}
		}
		frame = requestAnimationFrame(animate)
		return () => cancelAnimationFrame(frame)
	}, [angle, velocity, opacity])

	if (opacity <= 0) return null

	return (
		<div
			className="absolute w-3 h-3 rounded-sm pointer-events-none"
			style={{
				left: pos.x,
				top: pos.y,
				backgroundColor: color,
				transform: `rotate(${pos.rotation}deg)`,
				opacity,
			}}
		/>
	)
}

// Confetti cannon
function ConfettiCannon({ x, y, active }: { x: number; y: number; active: boolean }) {
	const [pieces, setPieces] = useState<Array<{ id: number; color: string; angle: number; velocity: number }>>([])

	useEffect(() => {
		if (active) {
			const newPieces = Array.from({ length: 50 }, (_, i) => ({
				id: Date.now() + i,
				color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)] as string,
				angle: -Math.PI / 2 + (Math.random() - 0.5) * Math.PI,
				velocity: 10 + Math.random() * 15,
			}))
			setPieces((prev) => [...prev, ...newPieces])
			setTimeout(() => setPieces([]), 3000)
		}
	}, [active])

	return (
		<div className="absolute inset-0 pointer-events-none overflow-hidden">
			{pieces.map((piece) => (
				<ConfettiPiece key={piece.id} startX={x} startY={y} {...piece} />
			))}
		</div>
	)
}

// Particle explosion component with more particles
function ParticleExplosion({ active, x, y }: { active: boolean; x?: number; y?: number }) {
	const particles = Array.from({ length: 50 }, (_, i) => ({
		id: i,
		angle: (i * 7.2 * Math.PI) / 180,
		distance: 50 + Math.random() * 300,
		emoji: ["✨", "🚀", "💥", "⚡", "🔥", "💫", "🌟", "🎉", "🎊", "💎", "⭐", "🌈"][i % 12],
		size: 16 + Math.random() * 24,
	}))

	if (!active) return null

	return (
		<div className="absolute inset-0 pointer-events-none overflow-hidden">
			{particles.map((p) => (
				<div
					key={p.id}
					className="absolute animate-ping"
					style={{
						left: x || "50%",
						top: y || "50%",
						fontSize: p.size,
						transform: `translate(-50%, -50%) translate(${Math.cos(p.angle) * p.distance}px, ${Math.sin(p.angle) * p.distance}px)`,
						animationDelay: `${p.id * 0.03}s`,
						animationDuration: "0.8s",
					}}>
					{p.emoji}
				</div>
			))}
		</div>
	)
}

// Screen shake effect
function useScreenShake() {
	const [shake, setShake] = useState(false)

	const triggerShake = useCallback(() => {
		setShake(true)
		setTimeout(() => setShake(false), 500)
	}, [])

	return { shake, triggerShake }
}

// Rainbow text effect
function RainbowText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
	return (
		<span
			className={`bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent openclaw-rainbow-text ${className}`}>
			{children}
		</span>
	)
}

// Typing effect for dramatic reveals
function TypeWriter({ text, speed = 50 }: { text: string; speed?: number }) {
	const [displayed, setDisplayed] = useState("")

	useEffect(() => {
		let i = 0
		const timer = setInterval(() => {
			if (i < text.length) {
				setDisplayed(text.slice(0, i + 1))
				i++
			} else {
				clearInterval(timer)
			}
		}, speed)
		return () => clearInterval(timer)
	}, [text, speed])

	return (
		<span>
			{displayed}
			<span className="animate-pulse">|</span>
		</span>
	)
}

export function OpenClawTakeover() {
	const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
	const [showExplosion, setShowExplosion] = useState(false)
	const [explosionPos, setExplosionPos] = useState({ x: 0, y: 0 })
	const [hypeLevel, setHypeLevel] = useState(0)
	const [showMessage, setShowMessage] = useState(false)
	const [currentHypeMessage, setCurrentHypeMessage] = useState(0)
	const [showConfetti, setShowConfetti] = useState(false)
	const [confettiPos, setConfettiPos] = useState({ x: 0, y: 0 })
	const [comboCount, setComboCount] = useState(0)
	const [showCombo, setShowCombo] = useState(false)
	const heroRef = useRef<HTMLElement>(null)
	const { shake, triggerShake } = useScreenShake()

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

	// Initial animations
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowExplosion(true)
			setExplosionPos({ x: 0, y: 0 })
			setTimeout(() => setShowExplosion(false), 1500)
		}, 500)

		const hypeTimer = setInterval(() => {
			setHypeLevel((prev) => Math.min(prev + 1, 11))
		}, 600)

		const messageTimer = setTimeout(() => setShowMessage(true), 1500)

		// Cycle through hype messages
		const hypeMessageTimer = setInterval(() => {
			setCurrentHypeMessage((prev) => (prev + 1) % HYPE_MESSAGES.length)
		}, 2000)

		return () => {
			clearTimeout(timer)
			clearInterval(hypeTimer)
			clearTimeout(messageTimer)
			clearInterval(hypeMessageTimer)
		}
	}, [])

	const handleHypeClick = (e: React.MouseEvent) => {
		const rect = heroRef.current?.getBoundingClientRect()
		if (rect) {
			setExplosionPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
			setConfettiPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
		}
		setShowExplosion(true)
		setShowConfetti(true)
		setHypeLevel((prev) => Math.min(prev + 2, 11))
		setComboCount((prev) => prev + 1)
		setShowCombo(true)
		triggerShake()

		setTimeout(() => setShowExplosion(false), 800)
		setTimeout(() => setShowConfetti(false), 100)
		setTimeout(() => setShowCombo(false), 1000)

		// Reset combo after 2 seconds of no clicks
		setTimeout(() => setComboCount(0), 2000)
	}

	// Calculate hype percentage (can go to 110%)
	const hypePercentage = Math.round((hypeLevel / 11) * 110)

	return (
		<>
			{/* MEGA HERO SECTION - FULL SCREEN ABSOLUTE CHAOS */}
			<section
				ref={heroRef}
				className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden ${shake ? "openclaw-shake-animation" : ""}`}>
				{/* Crazy animated gradient background that follows mouse */}
				<div
					className="absolute inset-0 transition-all duration-200 ease-out"
					style={{
						background: `
							radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(139, 92, 246, 0.5) 0%, transparent 40%),
							radial-gradient(circle at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(59, 130, 246, 0.5) 0%, transparent 40%),
							radial-gradient(circle at ${mousePos.y}% ${mousePos.x}%, rgba(236, 72, 153, 0.3) 0%, transparent 35%),
							radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 70%),
							linear-gradient(to bottom, hsl(var(--background)), hsl(var(--background)))
						`,
					}}
				/>

				{/* More floating emoji chaos */}
				<div className="absolute inset-0 overflow-hidden">
					<FloatingEmoji
						emoji="🦘"
						delay={0}
						duration={3}
						startX={5}
						startY={15}
						size="text-8xl md:text-9xl"
					/>
					<FloatingEmoji
						emoji="🦞"
						delay={0.5}
						duration={4}
						startX={90}
						startY={10}
						size="text-8xl md:text-9xl"
					/>
					<FloatingEmoji emoji="🚀" delay={1} duration={3.5} startX={15} startY={75} />
					<FloatingEmoji emoji="⚡" delay={1.5} duration={2.5} startX={80} startY={65} />
					<FloatingEmoji emoji="💻" delay={2} duration={4} startX={3} startY={45} />
					<FloatingEmoji emoji="🤖" delay={0.3} duration={3} startX={95} startY={85} />
					<FloatingEmoji emoji="🔥" delay={0.8} duration={3.5} startX={45} startY={90} />
					<FloatingEmoji emoji="✨" delay={1.2} duration={2.8} startX={25} startY={5} />
					<FloatingEmoji emoji="💥" delay={0.7} duration={4.2} startX={65} startY={20} />
					<FloatingEmoji emoji="🎉" delay={1.8} duration={3.2} startX={35} startY={60} />
					<FloatingEmoji emoji="🌟" delay={0.2} duration={3.8} startX={75} startY={40} />
					<FloatingEmoji emoji="💎" delay={1.4} duration={2.9} startX={10} startY={35} />
					<FloatingEmoji emoji="🎊" delay={0.9} duration={3.6} startX={55} startY={8} />
					<FloatingEmoji emoji="⭐" delay={1.6} duration={4.1} startX={88} startY={55} />
				</div>

				{/* PARTICLE EXPLOSIONS */}
				<ParticleExplosion
					active={showExplosion}
					x={explosionPos.x || undefined}
					y={explosionPos.y || undefined}
				/>

				{/* CONFETTI */}
				<ConfettiCannon x={confettiPos.x} y={confettiPos.y} active={showConfetti} />

				{/* Pulsing rings - more of them */}
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<div
						className="absolute w-[400px] h-[400px] rounded-full border-4 border-violet-500/30 animate-ping"
						style={{ animationDuration: "2s" }}
					/>
					<div
						className="absolute w-[600px] h-[600px] rounded-full border-2 border-pink-500/20 animate-ping"
						style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
					/>
					<div
						className="absolute w-[800px] h-[800px] rounded-full border-2 border-blue-500/15 animate-ping"
						style={{ animationDuration: "3s", animationDelay: "1s" }}
					/>
					<div
						className="absolute w-[1000px] h-[1000px] rounded-full border border-purple-500/10 animate-ping"
						style={{ animationDuration: "4s", animationDelay: "1.5s" }}
					/>
					<div
						className="absolute w-[1200px] h-[1200px] rounded-full border border-cyan-500/5 animate-ping"
						style={{ animationDuration: "5s", animationDelay: "2s" }}
					/>
				</div>

				{/* Main Content */}
				<div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
					{/* Combo counter floating up */}
					{showCombo && comboCount > 1 && (
						<div className="absolute top-1/3 text-4xl font-black text-yellow-400 pointer-events-none openclaw-float-up-animation">
							{comboCount}x COMBO!
						</div>
					)}

					{/* INSANE BANNER */}
					<div
						className={`mb-6 transform transition-all duration-500 ${showMessage ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
						<div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 via-pink-600 to-blue-600 px-8 py-4 text-white font-black shadow-2xl shadow-purple-500/50 animate-pulse">
							<Sparkles className="size-6 animate-spin" style={{ animationDuration: "2s" }} />
							<span className="text-xl">🚨 THIS IS NOT A DRILL 🚨</span>
							<Sparkles className="size-6 animate-spin" style={{ animationDuration: "2s" }} />
						</div>
					</div>

					{/* Rotating hype message */}
					<div className="h-8 mb-4 overflow-hidden">
						<p className="text-lg font-bold text-pink-500 animate-pulse">
							{HYPE_MESSAGES[currentHypeMessage]}
						</p>
					</div>

					{/* MEGA LOGOS - BIGGER */}
					<div className="flex items-center justify-center gap-4 md:gap-10 mb-8">
						<div
							className="flex flex-col items-center group cursor-pointer"
							onClick={handleHypeClick}
							role="button"
							tabIndex={0}
							onKeyDown={(e) => e.key === "Enter" && handleHypeClick(e as unknown as React.MouseEvent)}>
							<div
								className={`size-32 md:size-44 rounded-3xl bg-gradient-to-br from-violet-400 via-purple-500 to-violet-700 flex items-center justify-center shadow-2xl shadow-violet-500/60 transform transition-all duration-300 hover:scale-110 hover:rotate-12 ${hypeLevel > 5 ? "animate-bounce" : ""} ${hypeLevel > 8 ? "openclaw-mega-pulse-animation" : ""}`}>
								<span className="text-8xl md:text-9xl">🦘</span>
							</div>
							<span className="text-xl font-black mt-3 bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
								Roo Code
							</span>
						</div>

						{/* EPIC ANIMATED CONNECTOR */}
						<div className="flex flex-col items-center relative">
							<div
								className={`text-6xl md:text-8xl font-black ${hypeLevel > 7 ? "animate-spin" : "animate-pulse"}`}
								style={{
									animationDuration: hypeLevel > 7 ? "1s" : "1.5s",
								}}>
								<RainbowText>×</RainbowText>
							</div>
							{hypeLevel >= 10 && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2">
									<Rocket className="size-8 text-yellow-400 animate-bounce" />
								</div>
							)}
						</div>

						<div
							className="flex flex-col items-center group cursor-pointer"
							onClick={handleHypeClick}
							role="button"
							tabIndex={0}
							onKeyDown={(e) => e.key === "Enter" && handleHypeClick(e as unknown as React.MouseEvent)}>
							<div
								className={`size-32 md:size-44 rounded-3xl bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-700 flex items-center justify-center shadow-2xl shadow-blue-500/60 transform transition-all duration-300 hover:scale-110 hover:-rotate-12 ${hypeLevel > 5 ? "animate-bounce" : ""} ${hypeLevel > 8 ? "openclaw-mega-pulse-animation" : ""}`}
								style={{ animationDelay: "0.15s" }}>
								<span className="text-8xl md:text-9xl">🦞</span>
							</div>
							<span className="text-xl font-black mt-3 bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent">
								OpenClaw
							</span>
						</div>
					</div>

					{/* INSANE HEADLINE */}
					<h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter max-w-6xl mb-6">
						<span className="block bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
							CODING AI
						</span>
						<span className="block text-4xl md:text-5xl lg:text-6xl my-2">
							<RainbowText>meets</RainbowText>
						</span>
						<span className="block bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
							DOING AI
						</span>
					</h1>

					{/* HYPE METER - NOW GOES TO 110% */}
					<div className="mb-8 flex flex-col items-center gap-2">
						<div className="flex items-center gap-3">
							<span className="text-sm font-bold text-muted-foreground">HYPE LEVEL:</span>
							<div className="flex gap-1">
								{Array.from({ length: 11 }, (_, i) => (
									<div
										key={i}
										className={`w-5 h-8 rounded transition-all duration-300 ${
											i < hypeLevel
												? i >= 10
													? "bg-gradient-to-t from-red-500 via-yellow-500 to-red-500 scale-125 animate-pulse"
													: "bg-gradient-to-t from-violet-500 to-pink-500 scale-110"
												: "bg-muted"
										}`}
									/>
								))}
							</div>
							<span
								className={`text-lg font-black ${hypePercentage >= 100 ? "text-yellow-400 animate-pulse" : "text-violet-500"}`}>
								{hypePercentage}%
							</span>
						</div>
						{hypePercentage >= 100 && (
							<span className="text-sm font-bold text-yellow-400 animate-bounce">
								🔥 MAXIMUM OVERDRIVE 🔥
							</span>
						)}
					</div>

					{/* Dramatic sub-headline with typewriter */}
					<p className="mt-2 max-w-3xl text-xl md:text-2xl text-muted-foreground mb-6">
						<span className="font-black text-foreground">Roo Code</span> writes your code.
						<br />
						<span className="font-black text-foreground">OpenClaw</span> does your chores.
						<br />
						<span className="text-lg font-bold">
							<TypeWriter text="Together? UNSTOPPABLE. 🔥💪🚀" speed={80} />
						</span>
					</p>

					{/* OpenClaw Capabilities with hover magic */}
					<div className="flex flex-wrap justify-center gap-3 mb-10">
						{OPENCLAW_CAPABILITIES.map((cap, idx) => {
							const Icon = cap.icon
							return (
								<div
									key={cap.label}
									className="flex items-center gap-2 rounded-full bg-card/90 backdrop-blur-sm border-2 border-blue-500/30 px-5 py-3 text-sm font-medium transform hover:scale-110 transition-all hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/30 hover:bg-blue-500/10 cursor-pointer"
									style={{ animationDelay: `${idx * 0.1}s` }}>
									<Icon className="size-5 text-blue-500" />
									<span>{cap.label}</span>
								</div>
							)
						})}
					</div>

					{/* MEGA CTA BUTTONS */}
					<div className="flex flex-col sm:flex-row gap-4 mb-8">
						<Button
							size="xl"
							className="bg-gradient-to-r from-violet-500 via-purple-600 to-blue-600 hover:from-violet-400 hover:via-purple-500 hover:to-blue-500 text-white border-0 shadow-2xl shadow-purple-500/50 transform hover:scale-110 transition-all text-xl px-12 py-6 h-auto font-bold"
							onClick={handleHypeClick}>
							<a
								href="https://openclaw.ai"
								target="_blank"
								rel="noreferrer"
								className="flex items-center justify-center gap-3">
								<span className="text-2xl">🦞</span>
								Explore OpenClaw
								<ArrowRight className="size-6" />
							</a>
						</Button>
						<Button
							size="xl"
							className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white border-0 shadow-2xl shadow-violet-500/50 transform hover:scale-110 transition-all text-xl px-12 py-6 h-auto font-bold"
							onClick={handleHypeClick}>
							<a
								href={EXTERNAL_LINKS.CLOUD_APP_SIGNUP_HOME}
								className="flex items-center justify-center gap-3">
								<span className="text-2xl">🦘</span>
								Start with Roo Code
								<ArrowRight className="size-6" />
							</a>
						</Button>
					</div>

					{/* Click instructions with more flair */}
					<p className="text-sm text-muted-foreground animate-bounce font-medium">
						👆 SMASH those logos for MAXIMUM HYPE 👆
					</p>
				</div>

				{/* Scroll indicator with more drama */}
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
					<div className="flex flex-col items-center gap-2">
						<span className="text-sm font-bold text-muted-foreground">
							There&apos;s more. Keep scrolling. 👀
						</span>
						<ArrowRight className="size-6 rotate-90 text-violet-500" />
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
						<h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
							<RainbowText>Better Together</RainbowText>
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Two AI powerhouses. One unstoppable workflow. Zero chill.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						{INTEGRATION_FEATURES.map((feature, idx) => {
							const Icon = feature.icon
							return (
								<div
									key={feature.title}
									className="rounded-3xl bg-card border-2 border-transparent hover:border-violet-500/50 shadow-xl p-8 group transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/20 hover:-translate-y-4"
									style={{ animationDelay: `${idx * 0.1}s` }}>
									<div className="inline-flex items-center justify-center size-20 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all shadow-lg">
										<Icon className="size-10 text-white" />
									</div>
									<h3 className="text-2xl font-black mb-3">{feature.title}</h3>
									<p className="text-muted-foreground text-lg">{feature.description}</p>
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
						<h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
							From <span className="text-blue-500">Chat</span> to{" "}
							<span className="text-violet-500">Code</span> to <RainbowText>Action</RainbowText>
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Watch the magic happen in three simple steps. ✨
						</p>
					</div>

					<div className="max-w-5xl mx-auto">
						<div className="grid md:grid-cols-3 gap-6">
							{/* Step 1 */}
							<div className="relative group">
								<div className="rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/20 p-8 h-full hover:border-blue-500/60 transition-all hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2">
									<div className="flex items-center gap-3 mb-6">
										<div className="size-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-black text-2xl shadow-lg">
											1
										</div>
										<MessageCircle className="size-10 text-blue-500" />
									</div>
									<h3 className="text-2xl font-black mb-3">Message OpenClaw</h3>
									<p className="text-muted-foreground italic text-lg">
										&quot;Build me a bot that checks my inbox every hour and summarizes new
										emails&quot;
									</p>
								</div>
								<div className="hidden md:flex absolute top-1/2 -right-3 text-muted-foreground items-center justify-center size-8 rounded-full bg-muted">
									<ArrowRight className="size-5" />
								</div>
							</div>

							{/* Step 2 */}
							<div className="relative group">
								<div className="rounded-3xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-2 border-violet-500/20 p-8 h-full hover:border-violet-500/60 transition-all hover:shadow-2xl hover:shadow-violet-500/20 hover:-translate-y-2">
									<div className="flex items-center gap-3 mb-6">
										<div className="size-14 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-white font-black text-2xl shadow-lg">
											2
										</div>
										<Code className="size-10 text-violet-500" />
									</div>
									<h3 className="text-2xl font-black mb-3">Roo Code Creates</h3>
									<p className="text-muted-foreground text-lg">
										Roo Code agents write, test, and deploy the integration code automatically. 🤖
									</p>
								</div>
								<div className="hidden md:flex absolute top-1/2 -right-3 text-muted-foreground items-center justify-center size-8 rounded-full bg-muted">
									<ArrowRight className="size-5" />
								</div>
							</div>

							{/* Step 3 */}
							<div className="relative group">
								<div className="rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/20 p-8 h-full hover:border-purple-500/60 transition-all hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2">
									<div className="flex items-center gap-3 mb-6">
										<div className="size-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-2xl shadow-lg">
											3
										</div>
										<Zap className="size-10 text-purple-500" />
									</div>
									<h3 className="text-2xl font-black mb-3">Automation Runs</h3>
									<p className="text-muted-foreground text-lg">
										Your custom bot runs 24/7, delivering summaries right to your chat. 🎉🚀
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA - MAXIMUM OVERDRIVE */}
			<section className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
				<div className="absolute inset-0">
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-violet-500/30 via-pink-500/20 to-blue-500/30 blur-[100px] animate-pulse" />
				</div>
				<div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-4xl md:text-7xl font-black tracking-tight mb-6">
							Ready to go <RainbowText className="text-5xl md:text-8xl">absolutely unhinged?</RainbowText>
						</h2>
						<p className="text-xl md:text-2xl text-muted-foreground mb-10">
							Join thousands of developers who&apos;ve already lost their minds over this integration.
							<br />
							<span className="text-base italic">(in the best way possible) 🤪</span>
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="xl"
								className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white border-0 shadow-2xl shadow-violet-500/40 transform hover:scale-110 transition-all text-xl px-10 py-6 h-auto font-bold">
								<a
									href={EXTERNAL_LINKS.CLOUD_APP_SIGNUP_HOME}
									className="flex items-center justify-center gap-3">
									🦘 Get Started with Roo Code
									<ArrowRight className="size-6" />
								</a>
							</Button>
							<Button
								size="xl"
								className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-white border-0 shadow-2xl shadow-blue-500/40 transform hover:scale-110 transition-all text-xl px-10 py-6 h-auto font-bold">
								<a
									href="https://openclaw.ai"
									target="_blank"
									rel="noreferrer"
									className="flex items-center justify-center gap-3">
									🦞 Visit OpenClaw.ai
									<ArrowRight className="size-6" />
								</a>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
