import { motion } from "framer-motion";
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

const About = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-24 container mx-auto px-6">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={0}
                    className="max-w-3xl"
                >
                    <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">Our Mission</span>
                    <h1 className="text-5xl md:text-7xl font-bold font-heading mb-8">
                        Visualizing the <span className="gradient-text">DNA</span> of code.
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                        Graphnous was founded on a simple premise: codebases are too complex to be understood through files and folders alone. We use advanced graph technology and AI to map the relationships that matter.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 mt-24">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        custom={1}
                        className="glass p-8 rounded-[2rem]"
                    >
                        <h3 className="text-2xl font-bold font-heading mb-4">The Graph Approach</h3>
                        <p className="text-muted-foreground">
                            By treating a codebase as a graph rather than a hierarchy, we reveal the hidden patterns, dependencies, and hotspots that traditional analysis tools miss.
                        </p>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        custom={2}
                        className="glass p-8 rounded-[2rem]"
                    >
                        <h3 className="text-2xl font-bold font-heading mb-4">AI-Native Insight</h3>
                        <p className="text-muted-foreground">
                            Our AI doesn't just read code; it understands intent. It uses the structural context provided by our graph engine to deliver answers that are accurate and actionable.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={3}
                    className="mt-32 text-center"
                >
                    <h2 className="text-3xl font-bold font-heading mb-6">Built for the future of development.</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto mb-12">
                        As AI starts writing more code, the human role shifts from writing to architecting. Graphnous is the tool designed for the architect.
                    </p>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default About;
