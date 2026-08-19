import Reveal from "./Reveal";
import { MapPin } from "lucide-react";

export default function ProjectCard({ project, index }) {
  return (
    <Reveal delay={index * 0.08}>
      <div className="card overflow-hidden group">
        <div className="h-40 bg-grid-panel bg-[length:24px_24px] bg-night-soft relative flex items-center justify-center border-b border-night-line">
          <div className="absolute inset-0 bg-gradient-to-t from-night-card via-transparent to-transparent" />
          <span className="font-mono text-xs text-gold relative">{project.capacity}</span>
        </div>
        <div className="p-6">
          <h3 className="font-display text-lg mb-1">{project.name}</h3>
          <p className="flex items-center gap-1.5 text-growth text-sm">
            <MapPin className="w-3.5 h-3.5" /> {project.result}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
