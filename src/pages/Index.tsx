import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FeaturesGrid from '@/components/FeaturesGrid';
import logo from "@/assets/logo.png";
import {
  Sparkles,
  ArrowRight,
  Github,
} from "lucide-react";
import IntegrationsGrid from "@/components/IntegrationsGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};



const Hero = () => (
  <section className="relative min-h-screen flex items-center flex-col justify-center pt-16 overflow-hidden">
    {/* Background glow */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full gradient-bg opacity-[0.07] blur-[120px]" />

    <div className="container mx-auto px-6 text-center relative z-10">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-6">
        <img src={logo} alt="Graphnous owl" className="h-48 w-48 mx-auto animate-float" />
      </motion.div>

      <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={1}
        className="text-muted-foreground text-sm tracking-widest uppercase mb-4 font-heading">
        <span className="italic">Nous</span> is an Ancient Greek term primarily meaning mind, intellect, or understanding.
      </motion.p>

      <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={2}
        className="font-heading text-5xl md:text-7xl font-bold leading-tight max-w-4xl mx-auto my-6">
        Your codebase,{" "}
        <span className="gradient-text">understood by AI</span>
      </motion.h1>

      <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={3}
        className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
        Static analysis, dependency graphs, Merkle trees, hotspot detection &amp; god class alerts — powered by intelligence, not just rules.
      </motion.p>

      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
        className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button variant="hero" size="lg" className="text-base px-8">
          Get started free <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
        <Button variant="hero-outline" size="lg" className="text-base px-8">
          <Github className="mr-1 h-4 w-4" /> View on GitHub
        </Button>
      </motion.div>

      <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={5}
        className="text-muted-foreground text-sm mt-6">
        Free tier includes full project graph &amp; dependency tree
      </motion.p>
    </div>
  </section>
);

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
          Works with favorite your <span className="gradient-text">stack</span>
        </h2>
        <p className="text-muted-foreground mb-12 max-w-lg mx-auto">
          Integrate seamlessly with your workflow.
        </p>
      </motion.div>
      <div className="flex flex-wrap justify-center gap-2">
        <IntegrationsGrid />
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



const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturesGrid />
      <TechSection />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
