import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { company } from "../data/content";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
        "Hi, I'd like a free solar site survey and quote."
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-growth text-night flex items-center justify-center shadow-lg shadow-growth/30"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" fill="currentColor" strokeWidth={0} />
    </motion.a>
  );
}
