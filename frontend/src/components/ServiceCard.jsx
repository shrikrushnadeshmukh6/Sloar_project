import Reveal from "./Reveal";

export default function ServiceCard({ service, index }) {
  return (
    <Reveal delay={index * 0.08}>
      <div className="card p-7 h-full">
        <h3 className="font-display text-lg mb-3 text-paper">{service.name}</h3>
        <p className="text-muted text-sm leading-relaxed">{service.description}</p>
      </div>
    </Reveal>
  );
}
