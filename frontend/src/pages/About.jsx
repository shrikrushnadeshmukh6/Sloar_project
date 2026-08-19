import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import StatBlock from "../components/StatBlock";
import { stats, whyUs, company } from "../data/content";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div>
      <section className="section-py !pt-16">
        <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="eyebrow mb-4">About {company.name}</p>
            <h1 className="text-4xl md:text-5xl tracking-tight mb-6">
              We treat every roof as a
              <span className="text-gold"> power plant.</span>
            </h1>
            <p className="text-muted text-lg leading-relaxed mb-6">
              {company.name} started with a simple frustration: solar quotes
              that all looked the same, regardless of the roof, the shading,
              or the household's actual usage. We build systems around your
              property first — the package comes second.
            </p>
            <p className="text-muted leading-relaxed">
              Today our own survey, design, installation and maintenance
              teams have powered homes, factories and housing societies
              across Maharashtra, with a single point of accountability from
              first enquiry to final handover.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="card p-8 grid grid-cols-2 gap-8">
              {stats.map((s, i) => (
                <StatBlock key={s.label} stat={s} index={i} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-py border-t border-night-line bg-night-soft">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our approach"
            title="Four commitments behind every installation"
          />
          <div className="grid sm:grid-cols-2 gap-6 mt-14">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="card p-7">
                  <h3 className="font-display text-lg mb-2">{w.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{w.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py border-t border-night-line">
        <div className="container-px mx-auto max-w-7xl text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl tracking-tight mb-6">
              Ready to see what your roof could generate?
            </h2>
            <Link to="/contact" className="btn-primary">
              Get a Free Site Survey <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
