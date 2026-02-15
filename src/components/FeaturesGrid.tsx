import { Share2, Database, Cpu, GitBranch, Binary, Eye, RefreshCw, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TextScramble } from "@/components/ui/text-scramble";
import { useState } from 'react';
import { SparklesText } from '@/components/ui/sparkles-text';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const FeaturesGrid = () => {
  const [isTrigger, setIsTrigger] = useState(false)

  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            See Your Code <span className="gradient-text">Like Never Before</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stop reading files. Start exploring your architecture through an intelligent, living map.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[220px]">

          {/* Main WOW: The Graph */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="md:col-span-2 md:row-span-2 glass rounded-[2rem] p-10 relative overflow-hidden group hover:border-primary/40 transition-colors"
          >
            <div className="relative z-10 h-full flex flex-col">
              <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
                <Share2 className="text-white h-6 w-6" />
              </div>
              <h3 className="font-heading text-3xl font-bold mb-4">The Neural Network of Your Code</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We transform millions of lines of text into a living, breathing map.
                Trace logic across modules, find hidden bottlenecks, and visualize
                dependencies in real-time.
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 bg-primary/10 h-64 w-64 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all duration-700" />
          </motion.div>

          {/* Card: Architectural X-Ray */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="md:col-span-2 gradient-bg rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="flex justify-between items-start relative z-10">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest border border-white/10 uppercase font-semibold">Live Analysis</div>
            </div>
            <div className="relative z-10">
              <h3 className="font-heading text-2xl font-bold mb-2 text-white">Architectural X-Ray</h3>
              <p className="text-white/80 leading-relaxed">
                Change one line, see the ripple effect everywhere. Predict breaking
                changes across your entire ecosystem before you even save.
              </p>
            </div>
          </motion.div>

          {/* New Card: The Digital Twin (Sync) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={3}
            className="md:col-span-1 glass rounded-[2rem] p-6 flex flex-col justify-between group hover:border-primary/40 transition-all"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <RefreshCw className="text-primary h-5 w-5 group-hover:rotate-180 transition-transform duration-1000" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg">The Digital Twin</h4>
              <p className="text-muted-foreground text-sm mt-2">Real-time sync between your disk and the graph.</p>
            </div>
          </motion.div>

          {/* Card: Polyglot DNA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={4}
            onHoverStart={() => setIsTrigger(true)}
            className="md:col-span-1 glass rounded-[2rem] p-6 flex flex-col items-center text-center justify-center group hover:border-accent/40 transition-all"
          >
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Binary className="text-accent h-6 w-6" />
            </div>
            <h4 className="font-heading font-bold text-lg">
              <TextScramble className="font-mono text-sm uppercase"
                trigger={isTrigger}
                onScrambleComplete={() => setIsTrigger(false)}
                characterSet="01"
                speed={0.01}
              >
                Polyglot DNA
              </TextScramble>
            </h4>
            <p className="text-muted-foreground text-sm mt-2 text-center">Java, NPM, Maven. One graph to rule them all.</p>
          </motion.div>

          {/* Card: Deep Ancestry */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={5}
            className="md:col-span-2 glass rounded-[2rem] p-6 flex flex-col items-center text-center justify-center group hover:border-primary/40 transition-all"
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
              <GitBranch className="text-primary h-6 w-6" />
            </div>
            <h4 className="font-heading font-bold text-lg">Deep Ancestry</h4>
            <p className="text-muted-foreground text-sm mt-2 text-center">Find vulnerabilities hiding 10 levels deep.</p>
          </motion.div>

          {/* AI WOW */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={6}
            className="md:col-span-2 glass rounded-[2rem] p-6 flex flex-col items-center text-center justify-center group hover:border-accent/40 transition-all"
          >
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Cpu className="text-accent h-6 w-6" />
            </div>
            <h4 className="font-heading font-bold text-lg">Semantic Search</h4>
            <p className="text-muted-foreground text-sm mt-2 text-center">Find logic by meaning, not just by keywords.</p>
          </motion.div>

          {/* Final Row: Ask Your Code */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={7}
            className="md:col-span-4 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative glass rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 border-primary/20 hover:border-primary/50 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Database className="h-32 w-32 -rotate-12 translate-x-8 -translate-y-8" />
              </div>

              <div className="flex items-center gap-8 relative z-10">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
                  <Database className="text-white h-10 w-10" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <SparklesText className="font-heading text-3xl font-bold mr-2" text="Ask Anything" />
                    <span className="bg-primary/20 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-primary/20">AI Powered</span>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                    "Where is this data leaking?" or "Show me the path between these services."
                    Get instant, graph-backed intelligence for your entire codebase.
                  </p>
                </div>
              </div>
              <Button
                variant="hero"
                className="relative z-10 px-8 py-7 rounded-2xl text-base font-bold shadow-2xl active:scale-95 transition-all group/btn whitespace-nowrap overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 animate-pulse text-white/80" />
                  Try AI Search
                  <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section >
  );
};

export default FeaturesGrid;