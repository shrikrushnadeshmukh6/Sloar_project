import { motion } from "framer-motion";
import { Sun, PanelTop, Home, Zap } from "lucide-react";

const nodes = [
  { icon: Sun, label: "Sunlight" },
  { icon: PanelTop, label: "Solar Panel" },
  { icon: Zap, label: "Inverter" },
  { icon: Home, label: "Your Property" },
];

export default function EnergyFlow() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-2">
      {nodes.map((node, i) => (
        <div key={node.label} className="flex md:flex-1 items-center w-full md:w-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex flex-col items-center gap-3 text-center flex-1 md:flex-none"
          >
            <div className="w-16 h-16 rounded-2xl border border-night-line bg-night-card flex items-center justify-center">
              <node.icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              {node.label}
            </span>
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.div
              className="hidden md:block flex-1 h-px bg-gradient-to-r from-gold/60 to-gold/10 mx-2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 + 0.2 }}
              style={{ transformOrigin: "left" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
