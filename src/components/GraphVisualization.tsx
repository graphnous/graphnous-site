import { useRef, useEffect, useCallback, useState } from "react";

export interface GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  type: "core" | "module" | "leaf";
  baseX: number;
  baseY: number;
}

interface Edge {
  from: number;
  to: number;
}

const NODE_LABELS = [
  "App.tsx", "index.ts", "auth", "api", "utils",
  "hooks", "store", "types", "config", "router",
  "db", "cache", "logger", "test", "build",
  "Main.java", "Service", "Controller", "Model", "DAO",
];

const COLORS = {
  core: { fill: "rgba(168, 85, 247, 0.9)", stroke: "rgba(168, 85, 247, 0.4)", glow: "rgba(168, 85, 247, 0.15)" },
  module: { fill: "rgba(236, 72, 153, 0.8)", stroke: "rgba(236, 72, 153, 0.3)", glow: "rgba(236, 72, 153, 0.1)" },
  leaf: { fill: "rgba(139, 92, 246, 0.6)", stroke: "rgba(139, 92, 246, 0.2)", glow: "rgba(139, 92, 246, 0.08)" },
};

function createGraph(w: number, h: number): { nodes: GraphNode[]; edges: Edge[] } {
  const cx = w / 2;
  const cy = h / 2;
  const count = Math.min(20, Math.max(12, Math.floor((w * h) / 25000)));
  const nodes: GraphNode[] = [];
  const edges: Edge[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const dist = (i < 3 ? 0.15 : i < 8 ? 0.3 : 0.42) * Math.min(w, h) + Math.random() * 30;
    const bx = cx + Math.cos(angle) * dist;
    const by = cy + Math.sin(angle) * dist;
    nodes.push({
      x: bx, y: by, baseX: bx, baseY: by,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: i < 3 ? 6 : i < 8 ? 4.5 : 3,
      label: NODE_LABELS[i % NODE_LABELS.length],
      type: i < 3 ? "core" : i < 8 ? "module" : "leaf",
    });
  }

  for (let i = 1; i < count; i++) {
    const parent = i < 3 ? 0 : i < 8 ? Math.floor(Math.random() * 3) : 3 + Math.floor(Math.random() * 5);
    edges.push({ from: parent, to: i });
  }
  for (let i = 0; i < Math.floor(count * 0.3); i++) {
    const a = Math.floor(Math.random() * count);
    const b = Math.floor(Math.random() * count);
    if (a !== b) edges.push({ from: a, to: b });
  }

  return { nodes, edges };
}

interface Props {
  onNodeClick?: (node: GraphNode, index: number) => void;
  selectedNode?: number | null;
}

export default function GraphVisualization({ onNodeClick, selectedNode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const graphRef = useRef<{ nodes: GraphNode[]; edges: Edge[] } | null>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = parent.clientWidth * dpr;
    canvas.height = parent.clientHeight * dpr;
    canvas.style.width = parent.clientWidth + "px";
    canvas.style.height = parent.clientHeight + "px";
    graphRef.current = createGraph(parent.clientWidth, parent.clientHeight);
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const findNode = (mx: number, my: number): number | null => {
      const g = graphRef.current;
      if (!g) return null;
      for (let i = 0; i < g.nodes.length; i++) {
        const n = g.nodes[i];
        const dx = mx - n.x;
        const dy = my - n.y;
        if (dx * dx + dy * dy < 400) return i;
      }
      return null;
    };

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      setHovered(findNode(mouseRef.current.x, mouseRef.current.y));
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const idx = findNode(mx, my);
      if (idx !== null && graphRef.current && onNodeClick) {
        e.stopPropagation();
        onNodeClick(graphRef.current.nodes[idx], idx);
      }
    };

    const handleLeave = () => { mouseRef.current = null; setHovered(null); };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("click", handleClick);
    return () => {
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("click", handleClick);
    };
  }, [onNodeClick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    let time = 0;

    const draw = () => {
      const g = graphRef.current;
      if (!g) { animRef.current = requestAnimationFrame(draw); return; }

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      time += 0.005;

      const mouse = mouseRef.current;

      for (const n of g.nodes) {
        n.x = n.baseX + Math.sin(time * 1.2 + n.baseX * 0.01) * 8;
        n.y = n.baseY + Math.cos(time * 0.9 + n.baseY * 0.01) * 6;
        if (mouse) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120 * 15;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }
      }

      for (const e of g.edges) {
        const a = g.nodes[e.from];
        const b = g.nodes[e.to];
        const isHighlighted = hovered === e.from || hovered === e.to || selectedNode === e.from || selectedNode === e.to;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        const mx = (a.x + b.x) / 2 + (a.y - b.y) * 0.1;
        const my = (a.y + b.y) / 2 + (b.x - a.x) * 0.1;
        ctx.quadraticCurveTo(mx, my, b.x, b.y);
        ctx.strokeStyle = isHighlighted ? "rgba(168, 85, 247, 0.5)" : "rgba(168, 85, 247, 0.12)";
        ctx.lineWidth = isHighlighted ? 1.5 : 0.7;
        ctx.stroke();

        if (isHighlighted || Math.random() < 0.01) {
          const t = (time * 0.5 + e.from * 0.3) % 1;
          const px = (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * mx + t * t * b.x;
          const py = (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * my + t * t * b.y;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(236, 72, 153, 0.7)";
          ctx.fill();
        }
      }

      for (let i = 0; i < g.nodes.length; i++) {
        const n = g.nodes[i];
        const c = COLORS[n.type];
        const isHov = hovered === i;
        const isSel = selectedNode === i;

        if (isHov || isSel || n.type === "core") {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * (isHov || isSel ? 5 : 3), 0, Math.PI * 2);
          ctx.fillStyle = isHov || isSel ? "rgba(168, 85, 247, 0.15)" : c.glow;
          ctx.fill();
        }

        // Pulsing ring for selected
        if (isSel) {
          const pulseR = n.radius * 2.5 + Math.sin(time * 4) * 3;
          ctx.beginPath();
          ctx.arc(n.x, n.y, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(236, 72, 153, 0.5)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * (isHov || isSel ? 1.5 : 1), 0, Math.PI * 2);
        ctx.fillStyle = c.fill;
        ctx.fill();
        ctx.strokeStyle = isSel ? "rgba(236, 72, 153, 0.8)" : c.stroke;
        ctx.lineWidth = isSel ? 2 : 1;
        ctx.stroke();

        if (isHov || isSel) {
          ctx.font = "11px 'Space Grotesk', sans-serif";
          ctx.fillStyle = "rgba(255,255,255,0.85)";
          ctx.textAlign = "center";
          ctx.fillText(n.label, n.x, n.y - n.radius * 2 - 4);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [hovered, selectedNode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-crosshair"
      style={{ opacity: 0.7 }}
    />
  );
}
