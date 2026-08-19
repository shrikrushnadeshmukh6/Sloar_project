import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitEnquiry } from "../api/client";

const initialState = {
  name: "",
  phone: "",
  email: "",
  propertyType: "Residential",
  monthlyBill: "",
  city: "",
  message: "",
};

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Enter your name";
  if (!/^[0-9]{10}$/.test(values.phone.trim()))
    errors.phone = "Enter a valid 10-digit phone number";
  if (values.email && !/^\S+@\S+\.\S+$/.test(values.email))
    errors.email = "Enter a valid email";
  if (!values.city.trim()) errors.city = "Enter your city";
  return errors;
}

export default function EnquiryForm({ compact = false }) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      await submitEnquiry(values);
      setStatus("success");
      setValues(initialState);
    } catch (err) {
      console.error(err);
      setErrors({ form: err.response?.data?.message || "Unable to reach the enquiry service." });
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8 text-center flex flex-col items-center gap-3"
      >
        <CheckCircle2 className="w-10 h-10 text-growth" />
        <h3 className="font-display text-xl">Enquiry received</h3>
        <p className="text-muted text-sm max-w-xs">
          Thank you — our team will call you within one business day to schedule
          your free site survey.
        </p>
        <button
          className="btn-ghost mt-2 !py-2 !px-5 text-sm"
          onClick={() => setStatus("idle")}
        >
          Submit another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 md:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" name="name" error={errors.name}>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Abhishek Joshi"
            className={inputClass(errors.name)}
          />
        </Field>

        <Field label="Phone number" name="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            inputMode="numeric"
            value={values.phone}
            onChange={handleChange}
            placeholder="98765 43210"
            className={inputClass(errors.phone)}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email (optional)" name="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass(errors.email)}
          />
        </Field>

        <Field label="City" name="city" error={errors.city}>
          <input
            id="city"
            name="city"
            value={values.city}
            onChange={handleChange}
            placeholder="Pune"
            className={inputClass(errors.city)}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Property type" name="propertyType">
          <select
            id="propertyType"
            name="propertyType"
            value={values.propertyType}
            onChange={handleChange}
            className={inputClass()}
          >
            <option>Residential</option>
            <option>Commercial</option>
            <option>Industrial</option>
            <option>Society / Apartment</option>
          </select>
        </Field>

        <Field label="Average monthly bill (₹)" name="monthlyBill">
          <input
            id="monthlyBill"
            name="monthlyBill"
            inputMode="numeric"
            value={values.monthlyBill}
            onChange={handleChange}
            placeholder="4500"
            className={inputClass()}
          />
        </Field>
      </div>

      {!compact && (
        <Field label="Tell us about your requirement (optional)" name="message">
          <textarea
            id="message"
            name="message"
            rows={3}
            value={values.message}
            onChange={handleChange}
            placeholder="Roof size, shading, timeline, or anything else that helps us plan your survey."
            className={inputClass()}
          />
        </Field>
      )}

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-sm text-ember"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errors.form || "Something went wrong sending your enquiry. Please try again or call us directly."}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Sending...
          </>
        ) : (
          "Request Free Site Survey"
        )}
      </button>
      <p className="text-xs text-muted text-center">
        We'll only use these details to contact you about your solar enquiry.
      </p>
    </form>
  );
}

function Field({ label, name, error, children }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-mono uppercase tracking-wider text-muted mb-2">
        {label}
      </label>
      {children}
      {error && <p className="text-ember text-xs mt-1.5">{error}</p>}
    </div>
  );
}

function inputClass(error) {
  return `w-full rounded-lg bg-night border ${
    error ? "border-ember" : "border-night-line"
  } px-4 py-3 text-sm text-paper placeholder:text-muted/60 focus:outline-none focus:border-gold transition-colors`;
}
