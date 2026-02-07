import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function WarrantyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[100rem] mx-auto px-4 md:px-6 py-16">
          <h1 className="font-heading text-5xl text-primary mb-8">Warranty Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Warranty Coverage</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">Warranty Oriented Products Purchased from Sudha Novelties come with a manufacturer's warranty against defects in materials and workmanship for a period of 30 days from the date of purchase.</p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">What is Covered</h2>
              <ul className="font-paragraph text-base text-foreground space-y-3 list-disc list-inside">
                <li>Manufacturing defects in materials</li>
                <li>Defective workmanship</li>
                <li>Broken or non-functional parts due to manufacturing</li>
                <li>Paint or finish defects</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">What is NOT Covered</h2>
              <ul className="font-paragraph text-base text-foreground space-y-3 list-disc list-inside">
                <li>Normal wear and tear</li>
                <li>Damage from misuse or accidents</li>
                <li>Damage from improper storage or handling</li>
                <li>Damage from exposure to extreme temperatures or moisture</li>
                <li>Cosmetic damage that doesn't affect functionality</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Warranty Claim Process</h2>
              <ol className="font-paragraph text-base text-foreground space-y-3 list-decimal list-inside">
                <li>Report the defect within 30 days of purchase</li>
                <li>Provide proof of purchase and photos of the defect</li>
                <li>Our team will assess the claim</li>
                <li>If approved, we'll repair or replace the item at no cost</li>
              </ol>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Warranty Disclaimer</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                This warranty is provided as-is and is the sole remedy for defective products. We are not liable for any indirect, incidental, or consequential damages. Some regions may have additional consumer protection laws that apply.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
