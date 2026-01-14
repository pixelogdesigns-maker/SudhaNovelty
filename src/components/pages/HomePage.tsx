import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[600px] flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-4xl">
          <h1 className="font-heading text-5xl md:text-7xl text-primary mb-6">
            Welcome to Our Toy Store
          </h1>
          <p className="font-paragraph text-lg md:text-xl text-foreground mb-8">
            Discover amazing toys for children of all ages
          </p>
          <Link to="/toys">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}