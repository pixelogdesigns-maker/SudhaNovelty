interface HeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  author?: string;
}

export const Head = ({ 
  title = "Sudha Novelties - Premium Toys & Novelties Store",
  description = "Discover premium toys and novelties at Sudha Novelties. Shop quality toys for all ages with fast delivery and excellent customer service.",
  canonical = "https://sudha-novelties.com",
  ogImage = "https://static.wixstatic.com/media/b9ec8c_2c707b58db4c403ea854846b7dc81a3a~mv2.png",
  ogType = "website",
  keywords = "toys, novelties, toys store, premium toys, toys for kids, toys for all ages",
  author = "Sudha Novelties"
}: HeadProps = {}) => {
  const faviconUrl = "https://static.wixstatic.com/media/b9ec8c_8a4424cbc7cf48ea8968507b4cdb3d88~mv2.png/v1/fit/w_192,h_192,al_c/favicon.png?v=2";
  const siteUrl = "https://sudha-novelties.com";

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="theme-color" content="#F48FB1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Fonts */}
      <link rel="preconnect" href="https://static.parastorage.com" />
      
      {/* Favicon - Standard */}
      <link rel="icon" href={faviconUrl} type="image/png" sizes="192x192" />
      <link rel="shortcut icon" href={faviconUrl} type="image/png" />
      
      {/* Apple Touch Icon (Prevents iOS from adding a black/white background) */}
      <link rel="apple-touch-icon" href={faviconUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Sudha Novelties" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      
      {/* Sitemap and RSS */}
      <link rel="sitemap" href={`${siteUrl}/sitemap.xml`} />
    </>
  );
};