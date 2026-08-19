import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import SunArc from "../components/SunArc";
import EnergyFlow from "../components/EnergyFlow";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import StatBlock from "../components/StatBlock";
import ProductCard from "../components/ProductCard";
import ServiceCard from "../components/ServiceCard";
import ProjectCard from "../components/ProjectCard";
import EnquiryForm from "../components/EnquiryForm";
import {
  stats,
  productCategories,
  services,
  whyUs,
  projects,
  process,
  company,
} from "../data/content";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-panel bg-[length:48px_48px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="container-px mx-auto max-w-7xl relative pt-16 pb-6 md:pt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="eyebrow mb-5"
              >
                Solar EPC · Maharashtra
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-6xl leading-[1.05] tracking-tight mb-6"
              >
                Turn every sunrise into a{" "}
                <span className="text-gold">lower bill.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-muted text-lg leading-relaxed max-w-lg mb-9"
              >
                {company.name} designs, installs and maintains rooftop and
                commercial solar systems — engineered against your actual roof
                and consumption, not a generic package.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/contact" className="btn-primary">
                  Get a Free Site Survey <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/projects" className="btn-ghost">
                  See Our Projects
                </Link>
              </motion.div>
            </div>

            <SunArc className="w-full h-auto" />
          </div>
        </div>

        {/* Stats */}
        <div className="container-px mx-auto max-w-7xl border-t border-night-line grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {stats.map((s, i) => (
            <StatBlock key={s.label} stat={s} index={i} />
          ))}
        </div>
      </section>

      {/* Energy flow */}
      <section className="section-py border-t border-night-line">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How it works"
            title="From sunlight to savings in four steps"
            description="A grid-tied rooftop system converts sunlight into usable power for your property, exporting any surplus back through net metering."
          />
          <div className="mt-14">
            <EnergyFlow />
          </div>
        </div>
      </section>

      {/* Product teaser */}
      <section className="section-py border-t border-night-line bg-night-soft">
        <div className="container-px mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <SectionHeading
              eyebrow="Products"
              title="Systems sized for how you actually use power"
            />
            <Reveal>
              <Link to="/products" className="text-gold text-sm inline-flex items-center gap-1.5">
                View all products <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onEnquire={() => (window.location.href = "/contact")} />
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section-py border-t border-night-line">
        <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-start">
          <SectionHeading
            eyebrow="Why Suryavan"
            title="Built by the same team that installs it"
            description="No subcontracted crews and no black-box pricing. The engineers who design your system are accountable for how it performs."
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-growth shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-base mb-1.5">{w.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{w.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-py border-t border-night-line bg-night-soft">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Services"
            title="End-to-end, from survey to net metering"
            description="Every stage of the project — design, install, approvals, and upkeep — handled by one accountable team."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {services.map((s, i) => (
              <ServiceCard key={s.name} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-py border-t border-night-line">
        <div className="container-px mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <SectionHeading eyebrow="Recent projects" title="Proof, not promises" />
            <Reveal>
              <Link to="/projects" className="text-gold text-sm inline-flex items-center gap-1.5">
                All projects <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process strip */}
      <section className="section-py border-t border-night-line bg-night-soft">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="Process" title="What happens after you enquire" />
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

      {/* CTA + form */}
      <section className="section-py border-t border-night-line">
        <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <SectionHeading
            eyebrow="Get started"
            title="Get your free savings estimate this week"
            description="Share a few details and we'll schedule a site survey — no cost, no obligation. Most homeowners see their payback estimate within 24 hours."
          />
          <EnquiryForm compact />
        </div>
      </section>
    </div>
  );
}
