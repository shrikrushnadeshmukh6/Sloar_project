import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import Reveal from "../components/Reveal";
import Faq from "../components/Faq";
import { services, process, faqs } from "../data/content";

export default function Services() {
  return (
    <div>
      <section className="section-py !pt-16">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Services"
            title="One team, from first call to final handover"
            description="We don't hand your project off between contractors. Survey, design, installation, approvals and maintenance all sit with the same accountable team."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-px mx-auto max-w-7xl grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.name} service={s} index={i} />
          ))}
        </div>
      </section>

      <section className="section-py border-t border-night-line bg-night-soft">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="Timeline" title="What to expect, step by step" />
          <div className="mt-14 grid md:grid-cols-5 gap-6">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className="border-l-2 border-gold/40 pl-4">
                  <span className="font-mono text-xs text-gold">0{i + 1}</span>
                  <h3 className="font-display text-base mt-1 mb-1.5">{p.step}</h3>
                  <p className="text-muted text-sm leading-relaxed">{p.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py border-t border-night-line">
        <div className="container-px mx-auto max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="Common questions about our service" />
          <div className="mt-12">
            <Faq faqs={faqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
