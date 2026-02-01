import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { createToyColorVariants } from '@/lib/create-toy-color-variants';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateVariants = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await createToyColorVariants();
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 max-w-[100rem] mx-auto w-full px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl font-heading font-bold mb-4">Admin Tools</h1>
          <p className="text-lg font-paragraph text-gray-600 mb-8">
            Manage toy color variants and other administrative tasks.
          </p>

          <div className="bg-light-pink rounded-lg p-8 border border-primary/20">
            <h2 className="text-2xl font-heading font-semibold mb-4">Create Toy Color Variants</h2>
            <p className="font-paragraph text-gray-700 mb-6">
              This will create 4 color variants (blue, black, red, yellow) for each existing toy in the collection.
            </p>

            <Button
              onClick={handleCreateVariants}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-paragraph"
            >
              {isLoading ? 'Creating Variants...' : 'Create Color Variants'}
            </Button>

            {isLoading && (
              <div className="mt-6 flex items-center gap-3">
                <LoadingSpinner />
                <span className="font-paragraph text-gray-600">Processing...</span>
              </div>
            )}

            {result && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-heading font-semibold text-green-800 mb-2">Success!</h3>
                <div className="font-paragraph text-green-700 space-y-1">
                  <p>✅ Original toys: {result.totalOriginalToys}</p>
                  <p>✅ Variants created: {result.variantsCreated}</p>
                  <p>✅ Expected variants: {result.expectedVariants}</p>
                  {result.errors && result.errors.length > 0 && (
                    <div className="mt-3 text-red-600">
                      <p className="font-semibold">Errors encountered:</p>
                      <ul className="list-disc list-inside">
                        {result.errors.map((err: string, idx: number) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-heading font-semibold text-red-800 mb-2">Error</h3>
                <p className="font-paragraph text-red-700">{error}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
