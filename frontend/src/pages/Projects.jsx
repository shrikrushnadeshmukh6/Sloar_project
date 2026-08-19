import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { projects } from "../data/content";
import { ArrowRight } from "lucide-react";

export default function Projects() {
  return (
    <div>
      <section className="section-py !pt-16">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Projects"
            title="Installations across homes, factories and societies"
            description="A sample of recent rooftop and commercial installations, with the outcome each property saw after going live."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-px mx-auto max-w-7xl grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </section>

      <section className="section-py border-t border-night-line bg-night-soft text-center">
        <div className="container-px mx-auto max-w-7xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl tracking-tight mb-6">
              Your property could be next
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
