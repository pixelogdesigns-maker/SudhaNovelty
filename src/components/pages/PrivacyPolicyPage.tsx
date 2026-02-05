import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[100rem] mx-auto px-4 md:px-6 py-16">
          <h1 className="font-heading text-5xl text-primary mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Introduction</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Sudha Novelties ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Information We Collect</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed mb-3">
                We may collect information about you in a variety of ways. The information we may collect on the Site includes:
              </p>
              <ul className="font-paragraph text-base text-foreground space-y-2 list-disc list-inside">
                <li><strong>Personal Data:</strong> Name, email address, phone number, shipping address, and billing address</li>
                <li><strong>Payment Information:</strong> Credit card details and payment history</li>
                <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent on pages</li>
                <li><strong>Cookies:</strong> Information stored on your device to enhance your browsing experience</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">How We Use Your Information</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed mb-3">
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
              </p>
              <ul className="font-paragraph text-base text-foreground space-y-2 list-disc list-inside">
                <li>Process your transactions and send related information</li>
                <li>Email you regarding your order status and updates</li>
                <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site</li>
                <li>Generate a personal profile about you so that future visits to the Site will be personalized</li>
                <li>Increase the efficiency and operation of the Site</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Site</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Disclosure of Your Information</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                We may share your information with third parties only in the ways that are described in this privacy policy. We do not sell, trade, or rent your personal identification information to others. We may disclose generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners and trusted affiliates for the purposes outlined above.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Security of Your Information</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Contact Us</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                If you have questions or comments about this Privacy Policy, please contact us at the email address or phone number provided on our website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Changes to This Privacy Policy</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Sudha Novelties reserves the right to modify this privacy policy at any time. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
