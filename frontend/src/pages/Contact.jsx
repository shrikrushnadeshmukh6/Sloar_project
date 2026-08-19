import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import EnquiryForm from "../components/EnquiryForm";
import Reveal from "../components/Reveal";
import { company } from "../data/content";

export default function Contact() {
  return (
    <div>
      <section className="section-py !pt-16">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Contact"
            title="Tell us about your property"
            description="Fill in a few details and we'll call you to schedule a free site survey — usually within one business day."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <EnquiryForm />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Reveal>
              <div className="card p-7 space-y-5">
                <ContactRow icon={Phone} label="Call us" value={company.phone} href={`tel:${company.phone.replace(/\s/g, "")}`} />
                <ContactRow icon={MessageCircle} label="WhatsApp" value="Chat with our team" href={`https://wa.me/${company.whatsapp}`} />
                <ContactRow icon={Mail} label="Email" value={company.email} href={`mailto:${company.email}`} />
                <ContactRow icon={MapPin} label="Visit us" value={company.address} />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card overflow-hidden">
                <iframe
                  title="Location map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapsQuery)}&output=embed`}
                  width="100%"
                  height="240"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-gold" />
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted mb-0.5">{label}</p>
        <p className="text-paper text-sm">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
      {content}
    </a>
  ) : (
    content
  );
}
