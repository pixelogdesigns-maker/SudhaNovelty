import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[100rem] mx-auto px-4 md:px-6 py-16">
          <h1 className="font-heading text-5xl text-primary mb-8">Shipping Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Shipping Information</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                We're committed to delivering your toys safely and promptly. Please review our shipping policy to understand delivery times, costs, and procedures.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Delivery Areas</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                We currently ship to all major cities across India. For orders outside our standard delivery areas, please contact us for special arrangements.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Shipping Timeframes</h2>
              <ul className="font-paragraph text-base text-foreground space-y-3 list-disc list-inside">
                <li><strong>Standard Shipping:</strong> 5-7 business days</li>
                <li><strong>Express Shipping:</strong> 2-3 business days</li>
                <li><strong>Same-day Delivery:</strong> Available in select areas</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Shipping Costs</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Shipping costs are calculated based on the order value and delivery location. Free shipping is available on orders above a certain amount. Exact costs will be displayed at checkout.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Order Tracking</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Once your order is shipped, you'll receive a tracking number via email or WhatsApp. You can use this to track your package in real-time.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Damaged or Lost Shipments</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                If your package arrives damaged or is lost in transit, please contact us immediately with photos and your tracking number. We'll investigate and arrange a replacement or refund.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Returns and Exchanges</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Items can be returned or exchanged within 14 days of delivery if they're unused and in original packaging. Return shipping costs may apply unless the item is defective.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
