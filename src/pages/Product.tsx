import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cpu, GitBranch, Database, Shield } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
};

const Product = () => {
    const features = [
        {
            icon: <GitBranch className="h-6 w-6" />,
            title: "Dependency Mapping",
            subtitle: "See every connection across your entire project.",
        },
        {
            icon: <Cpu className="h-6 w-6" />,
            title: "Knowledge Discovery",
            subtitle: "Let AI surface the most critical parts of your stack.",
        },
        {
            icon: <Database className="h-6 w-6" />,
            title: "Multi-Language Support",
            subtitle: "One unified graph for Java, JavaScript, TypeScript, and more.",
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Secure Analysis",
            subtitle: "Your code stays yours. We only index the structure.",
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={0}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold font-heading mb-8">
                            Understand code, <br />
                            <span className="gradient-text">faster than ever.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                            Graphnous transforms your repositories into a live, interactive map.
                            Ask questions, trace bugs, and plan migrations with total clarity.
                        </p>
                    </motion.div>
                </div>

                {/* Feature Grid */}
                <div className="container mx-auto px-6 mt-24">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                custom={i}
                                className="glass p-8 rounded-3xl"
                            >
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 font-heading">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.subtitle}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Explanation Section */}
                <div className="container mx-auto px-6 mt-48">
                    <div className="glass p-12 md:p-24 rounded-[3rem] overflow-hidden relative">
                        <div className="grid md:grid-cols-2 items-center gap-16 relative z-10">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                custom={1}
                            >
                                <h2 className="text-4xl font-bold font-heading mb-6">How it works</h2>
                                <ol className="space-y-8">
                                    <li className="flex gap-4">
                                        <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 font-bold">1</span>
                                        <div>
                                            <h4 className="font-bold mb-1">Connect your Repo</h4>
                                            <p className="text-muted-foreground text-sm">We support GitHub, Maven, and local project uploads.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 font-bold">2</span>
                                        <div>
                                            <h4 className="font-bold mb-1">Graph Extraction</h4>
                                            <p className="text-muted-foreground text-sm">Our engine parses the AST and builds a detailed dependency graph.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 font-bold">3</span>
                                        <div>
                                            <h4 className="font-bold mb-1">Query with AI</h4>
                                            <p className="text-muted-foreground text-sm">Use natural language to explore the graph and get instant insights.</p>
                                        </div>
                                    </li>
                                </ol>
                            </motion.div>
                            <div className="bg-gradient-to-br from-primary/20 to-accent/20 h-64 md:h-[400px] rounded-3xl relative">
                                {/* Decorative element representing a graph */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-48 h-48 border-2 border-primary/30 rounded-full animate-pulse-glow" />
                                    <div className="absolute w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Product;
