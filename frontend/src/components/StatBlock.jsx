import Reveal from "./Reveal";

export default function StatBlock({ stat, index }) {
  return (
    <Reveal delay={index * 0.08} className="text-center md:text-left">
      <div className="font-display text-3xl md:text-4xl text-gold mb-1">{stat.value}</div>
      <div className="text-muted text-sm">{stat.label}</div>
    </Reveal>
  );
}
