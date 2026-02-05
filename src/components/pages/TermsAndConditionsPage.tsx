import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[100rem] mx-auto px-4 md:px-6 py-16">
          <h1 className="font-heading text-5xl text-primary mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Agreement to Terms</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Use License</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Permission is granted to temporarily download one copy of the materials (information or software) on Sudha Novelties' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="font-paragraph text-base text-foreground space-y-2 list-disc list-inside mt-3">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Disclaimer</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                The materials on Sudha Novelties' website are provided on an 'as is' basis. Sudha Novelties makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Limitations</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                In no event shall Sudha Novelties or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Sudha Novelties' website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Accuracy of Materials</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                The materials appearing on Sudha Novelties' website could include technical, typographical, or photographic errors. Sudha Novelties does not warrant that any of the materials on its website are accurate, complete, or current. Sudha Novelties may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Links</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Sudha Novelties has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Sudha Novelties of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Modifications</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Sudha Novelties may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-4">Governing Law</h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
