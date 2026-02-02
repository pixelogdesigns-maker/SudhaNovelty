import React from 'react';
import { Helmet } from 'react-helmet-async'; // Ensure you have react-helmet-async installed

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
  canonical?: string;
}

export const SEOHelmet = ({ 
  title = "Sudha Novelties | Premium Kids Rides & RC Toys in Thoothukudi", 
  description = "Visit Sudha Novelties for the best collection of kids battery cars, bikes, RC toys, and educational games. Located in WGC Road, Thoothukudi. Trusted for 10+ years.",
  image = "https://static.wixstatic.com/media/b9ec8c_8a4424cbc7cf48ea8968507b4cdb3d88~mv2.png",
  keywords = "toy store thoothukudi, kids battery car, remote control car, baby walker, sudha novelties, kids gifts",
  canonical
}: SEOProps) => {
  
  const siteUrl = "https://www.sudhanovelties.com"; // REPLACE with your actual domain

  // 1. ORGANIZATION SCHEMA (Helps get the Logo + Contact Info in search)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ToyStore",
    "name": "Sudha Novelties",
    "image": [image],
    "telephone": "+919944234077",
    "url": siteUrl,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "WGC Road",
      "addressLocality": "Thoothukudi",
      "addressRegion": "TN",
      "postalCode": "628002",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 8.8052603, // Hardcoded approx coords for WGC Road
      "longitude": 78.1452745
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "09:00",
      "closes": "22:00"
    },
    "sameAs": [
      "https://www.instagram.com/sudha_novelties_/",
      "https://www.facebook.com/people/Sudha-Novelties/100064035660636/" 
    ]
  };

  // 2. WEBSITE SCHEMA (Helps with the Sitelinks Search Box)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/toys?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical || siteUrl} />
      
      {/* Open Graph / WhatsApp Preview */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical || siteUrl} />
      <meta property="og:site_name" content="Sudha Novelties" />

      {/* Structured Data (The Secret Sauce for Rich Results) */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};