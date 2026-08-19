import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

export default function Faq({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="divide-y divide-night-line border-t border-b border-night-line">
      {faqs.map((f, i) => (
        <Reveal key={f.q} delay={i * 0.05}>
          <button
            className="w-full flex items-center justify-between py-6 text-left gap-4"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="font-display text-base md:text-lg text-paper">{f.q}</span>
            <motion.span animate={{ rotate: openIndex === i ? 45 : 0 }} transition={{ duration: 0.25 }}>
              <Plus className="w-5 h-5 text-gold shrink-0" />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-muted text-sm leading-relaxed pb-6 max-w-2xl">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      ))}
    </div>
  );
}
