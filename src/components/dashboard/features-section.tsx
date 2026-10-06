import { Award, ShieldCheck, Truck } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="border-t border-border/70 bg-card">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:grid-cols-3 lg:px-8">
        <div className="flex gap-3">
          <Truck className="mt-1 size-5 text-primary shrink-0" />
          <div>
            <p className="font-bold">Nationwide Italy Delivery</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Door-to-door temperature-controlled delivery for supermarkets
              &amp; wholesalers across Italy.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Award className="mt-1 size-5 text-primary shrink-0" />
          <div>
            <p className="font-bold">Authorized Tata Importer</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              100% genuine Tata Tea, Tata Sampann pulses, and Tata Salt with
              certified EU compliance.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <ShieldCheck className="mt-1 size-5 text-primary shrink-0" />
          <div>
            <p className="font-bold">25+ Years of B2B Heritage</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Trusted partnership since 1998 with tailored volume tiers and
              dedicated account support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
