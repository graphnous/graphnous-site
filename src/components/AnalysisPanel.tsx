import { motion, AnimatePresence } from "framer-motion";
import type { GraphNode } from "./GraphVisualization";
import { X, FileCode, GitBranch, AlertTriangle, BarChart3, Clock, Cpu } from "lucide-react";

// Mock analysis data per node type
const MOCK_DATA: Record<string, {
  lines: number;
  complexity: number;
  dependencies: number;
  lastChanged: string;
  hotspot: boolean;
  godClass: boolean;
  methods: number;
  coverage: number;
  issues: { level: "warn" | "error" | "info"; text: string }[];
}> = {
  "App.tsx": { lines: 342, complexity: 12, dependencies: 8, lastChanged: "2 hours ago", hotspot: true, godClass: false, methods: 5, coverage: 78, issues: [{ level: "warn", text: "High coupling with 8 direct dependencies" }, { level: "info", text: "Consider splitting into sub-routers" }] },
  "index.ts": { lines: 45, complexity: 2, dependencies: 3, lastChanged: "3 days ago", hotspot: false, godClass: false, methods: 1, coverage: 100, issues: [{ level: "info", text: "Entry point — clean barrel export" }] },
  "auth": { lines: 567, complexity: 24, dependencies: 6, lastChanged: "1 day ago", hotspot: true, godClass: true, methods: 18, coverage: 62, issues: [{ level: "error", text: "God class detected — 18 methods, 567 LOC" }, { level: "warn", text: "Cyclomatic complexity: 24" }, { level: "info", text: "Suggest extracting TokenManager and SessionHandler" }] },
  "api": { lines: 289, complexity: 15, dependencies: 5, lastChanged: "5 hours ago", hotspot: false, godClass: false, methods: 12, coverage: 85, issues: [{ level: "warn", text: "3 methods exceed 50 LOC" }] },
  "utils": { lines: 156, complexity: 8, dependencies: 1, lastChanged: "1 week ago", hotspot: false, godClass: false, methods: 14, coverage: 92, issues: [{ level: "info", text: "Well-isolated utility module" }] },
  "hooks": { lines: 203, complexity: 10, dependencies: 4, lastChanged: "4 hours ago", hotspot: false, godClass: false, methods: 7, coverage: 71, issues: [{ level: "warn", text: "useAuth hook has side effects" }] },
  "store": { lines: 412, complexity: 18, dependencies: 7, lastChanged: "12 hours ago", hotspot: true, godClass: false, methods: 15, coverage: 67, issues: [{ level: "warn", text: "Frequent changes — 23 commits this month" }, { level: "warn", text: "High fan-out: 7 dependencies" }] },
  "types": { lines: 89, complexity: 1, dependencies: 0, lastChanged: "2 weeks ago", hotspot: false, godClass: false, methods: 0, coverage: 100, issues: [{ level: "info", text: "Pure type definitions — no runtime code" }] },
  "config": { lines: 67, complexity: 3, dependencies: 2, lastChanged: "1 month ago", hotspot: false, godClass: false, methods: 2, coverage: 88, issues: [{ level: "info", text: "Stable configuration module" }] },
  "router": { lines: 178, complexity: 9, dependencies: 6, lastChanged: "3 hours ago", hotspot: false, godClass: false, methods: 4, coverage: 75, issues: [{ level: "warn", text: "6 lazy-loaded routes could benefit from prefetching" }] },
  "Main.java": { lines: 890, complexity: 35, dependencies: 12, lastChanged: "6 hours ago", hotspot: true, godClass: true, methods: 28, coverage: 45, issues: [{ level: "error", text: "God class — 28 methods, 890 LOC" }, { level: "error", text: "Cyclomatic complexity: 35 (critical)" }, { level: "warn", text: "Test coverage below 50%" }] },
  "Service": { lines: 345, complexity: 14, dependencies: 5, lastChanged: "1 day ago", hotspot: false, godClass: false, methods: 11, coverage: 82, issues: [{ level: "info", text: "Well-structured service layer" }] },
  "Controller": { lines: 234, complexity: 11, dependencies: 4, lastChanged: "2 days ago", hotspot: false, godClass: false, methods: 9, coverage: 79, issues: [{ level: "warn", text: "Missing input validation on 2 endpoints" }] },
};

const fallback = { lines: 120, complexity: 5, dependencies: 3, lastChanged: "3 days ago", hotspot: false, godClass: false, methods: 4, coverage: 80, issues: [{ level: "info" as const, text: "No issues detected" }] };

const levelColors = { error: "text-red-400", warn: "text-yellow-400", info: "text-blue-400" };
const levelBg = { error: "bg-red-400/10", warn: "bg-yellow-400/10", info: "bg-blue-400/10" };

interface Props {
  node: GraphNode | null;
  onClose: () => void;
}

export default function AnalysisPanel({ node, onClose }: Props) {
  if (!node) return null;
  const data = MOCK_DATA[node.label] || fallback;

  return (
    <AnimatePresence>
      {node && (
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed right-4 top-20 bottom-4 w-[380px] z-50 glass rounded-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
                <FileCode className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm">{node.label}</h3>
                <p className="text-muted-foreground text-xs capitalize">{node.type} module</p>
              </div>
            </div>
            <button onClick={onClose} className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-secondary transition-colors">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2 p-4">
            {[
              { icon: BarChart3, label: "Lines", value: data.lines.toLocaleString() },
              { icon: Cpu, label: "Complexity", value: data.complexity },
              { icon: GitBranch, label: "Dependencies", value: data.dependencies },
              { icon: Clock, label: "Last changed", value: data.lastChanged },
            ].map((s) => (
              <div key={s.label} className="bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <s.icon className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</span>
                </div>
                <p className="font-heading font-semibold text-sm">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="px-4 pb-3 flex gap-2 flex-wrap">
            {data.hotspot && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-orange-500/15 text-orange-400 border border-orange-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" /> Hotspot
              </span>
            )}
            {data.godClass && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-500/15 text-red-400 border border-red-500/20">
                <AlertTriangle className="h-2.5 w-2.5" /> God Class
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
              {data.methods} methods
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
              data.coverage >= 80 ? "bg-green-500/10 text-green-400 border-green-500/20" :
              data.coverage >= 60 ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
              "bg-red-500/10 text-red-400 border-red-500/20"
            }`}>
              {data.coverage}% coverage
            </span>
          </div>

          {/* Issues */}
          <div className="flex-1 overflow-auto px-4 pb-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-heading">AI Analysis</p>
            <div className="space-y-2">
              {data.issues.map((issue, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`${levelBg[issue.level]} rounded-lg p-3 border border-border/30`}
                >
                  <div className="flex items-start gap-2">
                    <span className={`text-[10px] font-bold uppercase ${levelColors[issue.level]} mt-0.5`}>
                      {issue.level}
                    </span>
                    <p className="text-xs text-foreground/80 leading-relaxed">{issue.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border/50 bg-secondary/30">
            <p className="text-[10px] text-muted-foreground text-center">
              ✨ Mock analysis — <span className="gradient-text font-medium">sign up</span> for real insights
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
