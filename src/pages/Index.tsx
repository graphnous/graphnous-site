import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import GraphVisualization, { type GraphNode } from "@/components/GraphVisualization";
import AnalysisPanel from "@/components/AnalysisPanel";
import logo from "@/assets/graphnous-logo.png";
import {
  GitBranch,
  Search,
  Network,
  BrainCircuit,
  Flame,
  TreePine,
  GitCompare,
  History,
  Sparkles,
  ArrowRight,
  Github,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass">
    <div className="container mx-auto flex items-center justify-between h-16 px-6">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Graphnous" className="h-8 w-8" />
        <span className="font-heading text-xl font-bold gradient-text">graphnous</span>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm">Log in</Button>
        <Button variant="hero" size="sm">Sign up</Button>
      </div>
    </div>
  </nav>
);

const Hero = ({ selectedNode, onNodeClick, onClose }: {
  selectedNode: { node: GraphNode; index: number } | null;
  onNodeClick: (node: GraphNode, index: number) => void;
  onClose: () => void;
}) => (
  <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden" onClick={onClose}>
    {/* Animated graph background */}
    <GraphVisualization onNodeClick={onNodeClick} selectedNode={selectedNode?.index ?? null} />
    {/* Background glow */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full gradient-bg opacity-[0.07] blur-[120px]" />

    <div className="container mx-auto px-6 text-center relative z-10 pointer-events-none">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-6">
        <img src={logo} alt="Graphnous owl" className="h-24 w-24 mx-auto animate-float" />
      </motion.div>

      <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={1}
        className="text-muted-foreground text-sm tracking-widest uppercase mb-4 font-heading">
        νοῦς · Greek for "mind" — the intellect that sees
      </motion.p>

      <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={2}
        className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-4xl mx-auto">
        Your codebase,{" "}
        <span className="gradient-text">understood by AI</span>
      </motion.h1>

      <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={3}
        className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
        Static analysis, dependency graphs, Merkle trees, hotspot detection &amp; god class alerts — powered by intelligence, not just rules.
      </motion.p>

      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
        <Button variant="hero" size="lg" className="text-base px-8">
          Get started free <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
        <Button variant="hero-outline" size="lg" className="text-base px-8">
          <Github className="mr-1 h-4 w-4" /> View on GitHub
        </Button>
      </motion.div>

      <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={5}
        className="text-muted-foreground text-sm mt-6">
        Free tier includes full project graph &amp; dependency tree · <span className="text-primary">click a node</span> to explore
      </motion.p>
    </div>

    <AnalysisPanel node={selectedNode?.node ?? null} onClose={onClose} />
  </section>
);

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Analysis",
    description: "Chat with your codebase. Ask questions, get architectural insights, understand complexity.",
  },
  {
    icon: Network,
    title: "Dependency Graphs",
    description: "Visualize every connection in your project. See how modules depend on each other at a glance.",
  },
  {
    icon: TreePine,
    title: "Merkle Trees",
    description: "Track exactly what changed between builds. Cryptographic precision for your code diffs.",
  },
  {
    icon: Flame,
    title: "Hotspot Detection",
    description: "Find the files that change most and carry the highest risk. Focus reviews where they matter.",
  },
  {
    icon: Search,
    title: "God Class Detection",
    description: "Spot classes that do too much. Get actionable refactoring suggestions from AI.",
  },
  {
    icon: GitCompare,
    title: "Branch Comparison",
    description: "Compare branches visually. See structural differences, not just line diffs.",
  },
  {
    icon: History,
    title: "File History",
    description: "Trace the evolution of any file. Understand why code looks the way it does.",
  },
  {
    icon: GitBranch,
    title: "CI/CD Integration",
    description: "Run scans from Maven, npm, or GitHub Actions. Fits your existing workflow.",
  },
];

const Features = () => (
  <section className="py-32 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        custom={0}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
          Everything you need to <span className="gradient-text">see clearly</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          From high-level architecture to individual file analysis, graphnous maps your entire codebase.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
            className="glass rounded-xl p-6 hover:border-primary/40 transition-colors group"
          >
            <div className="h-10 w-10 rounded-lg gradient-bg flex items-center justify-center mb-4 group-hover:glow-primary transition-shadow">
              <f.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const techStack = [
  { name: "Java", icon: "☕" },
  { name: "JavaScript", icon: "JS" },
  { name: "TypeScript", icon: "TS" },
  { name: "Maven", icon: "🪶" },
  { name: "npm", icon: "📦" },
  { name: "GitHub Actions", icon: "⚙️" },
];

const TechSection = () => (
  <section className="py-24 relative">
    <div className="container mx-auto px-6 text-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0}
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Works with your <span className="gradient-text">stack</span>
        </h2>
        <p className="text-muted-foreground mb-12 max-w-lg mx-auto">
          Push code directly, trigger scans from your package manager, or integrate with GitHub Actions.
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4">
        {techStack.map((t, i) => (
          <motion.div
            key={t.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
            className="glass rounded-xl px-6 py-4 flex items-center gap-3 hover:border-primary/40 transition-colors"
          >
            <span className="text-2xl">{t.icon}</span>
            <span className="font-heading font-medium">{t.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-32 relative">
    <div className="absolute inset-0 gradient-bg opacity-[0.04]" />
    <div className="container mx-auto px-6 text-center relative z-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0}
      >
        <Sparkles className="h-10 w-10 mx-auto mb-6 text-accent animate-pulse-glow" />
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
          Ready to understand your code?
        </h2>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-8">
          Start with the free tier — get your full project graph and dependency tree instantly.
        </p>
        <Button variant="hero" size="lg" className="text-base px-10">
          Get started free <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Graphnous" className="h-5 w-5" />
        <span className="font-heading text-sm font-medium gradient-text">graphnous</span>
      </div>
      <p className="text-muted-foreground text-xs">© 2026 Graphnous. All rights reserved.</p>
    </div>
  </footer>
);

const Index = () => {
  const [selectedNode, setSelectedNode] = useState<{ node: GraphNode; index: number } | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero
        selectedNode={selectedNode}
        onNodeClick={(node, index) => setSelectedNode({ node, index })}
        onClose={() => setSelectedNode(null)}
      />
      <Features />
      <TechSection />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
