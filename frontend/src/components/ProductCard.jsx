import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function ProductCard({ product, index, onEnquire }) {
  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="card p-7 h-full flex flex-col group"
      >
        <div className="flex items-start justify-between mb-4">
          <span className="font-mono text-xs text-gold border border-gold/30 rounded-full px-3 py-1">
            {product.range}
          </span>
        </div>
        <h3 className="font-display text-xl mb-2">{product.name}</h3>
        <p className="text-muted text-sm leading-relaxed mb-6 flex-1">
          {product.description}
        </p>
        <dl className="grid grid-cols-3 gap-3 mb-6 border-t border-night-line pt-5">
          {product.specs.map((s) => (
            <div key={s.label}>
              <dt className="text-[10px] uppercase tracking-wider text-muted mb-1">{s.label}</dt>
              <dd className="text-sm font-mono text-paper">{s.value}</dd>
            </div>
          ))}
        </dl>
        <button
          onClick={onEnquire}
          className="inline-flex items-center gap-1.5 text-sm text-gold group-hover:gap-2.5 transition-all self-start"
        >
          Enquire about this <ArrowUpRight className="w-4 h-4" />
        </button>
      </motion.div>
    </Reveal>
  );
}
