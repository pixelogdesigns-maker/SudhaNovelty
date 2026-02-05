import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ReplacementPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[100rem] mx-auto px-4 md:px-6 py-16">
          <h1 className="font-heading text-5xl text-primary mb-8">Replacement Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Overview</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                At Sudha Novelties, we stand behind the quality of our toys. If you receive a defective or damaged product, we're committed to making it right.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Replacement Eligibility</h2>
              <ul className="font-paragraph text-base text-foreground space-y-3 list-disc list-inside">
                <li>Product must be reported within 7 days of purchase</li>
                <li>Item must be unused and in original packaging</li>
                <li>Damage must be manufacturing defect, not user damage</li>
                <li>Original proof of purchase required</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">How to Request a Replacement</h2>
              <ol className="font-paragraph text-base text-foreground space-y-3 list-decimal list-inside">
                <li>Contact us via WhatsApp or email with photos of the defective item</li>
                <li>Provide your order number and proof of purchase</li>
                <li>Our team will review and approve your replacement request</li>
                <li>Once approved, we'll arrange for the replacement to be sent to you</li>
              </ol>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Replacement Timeline</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Approved replacements will be shipped within 5-7 business days. Shipping is complimentary for valid replacement claims.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Non-Replaceable Items</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Items that have been used, played with, or show signs of wear and tear are not eligible for replacement. Additionally, items damaged due to misuse or accidents are not covered under this policy.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
