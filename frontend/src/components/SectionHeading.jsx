import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <Reveal className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-paper mb-4">
        {title}
      </h2>
      {description && <p className="text-muted leading-relaxed">{description}</p>}
    </Reveal>
  );
}
