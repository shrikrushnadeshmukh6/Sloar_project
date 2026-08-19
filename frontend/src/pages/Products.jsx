import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import ProductCard from "../components/ProductCard";
import { productCategories } from "../data/content";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="section-py !pt-16">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Products"
            title="Every component, sized to your property"
            description="From a single rooftop array to a full commercial installation with battery backup — each system is specified against your roof, shading and load before it's quoted."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-px mx-auto max-w-7xl grid sm:grid-cols-2 gap-6">
          {productCategories.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onEnquire={() => navigate("/contact")}
            />
          ))}
        </div>
      </section>

      <section className="section-py border-t border-night-line bg-night-soft">
        <div className="container-px mx-auto max-w-7xl grid md:grid-cols-3 gap-8">
          <Reveal>
            <h3 className="font-display text-lg mb-2">Tier-1 panels only</h3>
            <p className="text-muted text-sm leading-relaxed">
              We install monocrystalline PERC panels from manufacturers on
              Bloomberg's Tier-1 list, backed by a 25-year performance
              warranty.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="font-display text-lg mb-2">Right-sized, not oversold</h3>
            <p className="text-muted text-sm leading-relaxed">
              Our survey team sizes your system against 12 months of actual
              consumption, so you're not paying for capacity you won't use.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <h3 className="font-display text-lg mb-2">Upgrade-ready design</h3>
            <p className="text-muted text-sm leading-relaxed">
              Every layout leaves room to add battery storage or extra panels
              later without re-engineering the mounting structure.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
