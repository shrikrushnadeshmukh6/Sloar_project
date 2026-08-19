import { Link } from "react-router-dom";
import { Sun, Phone, Mail, MapPin } from "lucide-react";
import { company } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-night-line bg-night-soft">
      <div className="container-px mx-auto max-w-7xl section-py !py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center">
              <Sun className="w-4 h-4 text-gold" />
            </span>
            <span className="font-display text-lg">{company.name}</span>
          </div>
          <p className="text-muted max-w-sm leading-relaxed">
            We design, install and support rooftop and commercial solar power
            systems across Maharashtra — from first survey to net metering.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm text-gold mb-4">Company</h4>
          <ul className="space-y-3 text-muted text-sm">
            <li><Link to="/about" className="hover:text-paper transition-colors">About Us</Link></li>
            <li><Link to="/products" className="hover:text-paper transition-colors">Products</Link></li>
            <li><Link to="/services" className="hover:text-paper transition-colors">Services</Link></li>
            <li><Link to="/projects" className="hover:text-paper transition-colors">Projects</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm text-gold mb-4">Contact</h4>
          <ul className="space-y-3 text-muted text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0" /> {company.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0" /> {company.email}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" /> {company.address}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-night-line">
        <div className="container-px mx-auto max-w-7xl py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted">
          <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
          <span>Built with React &amp; Node.js</span>
        </div>
      </div>
    </footer>
  );
}
