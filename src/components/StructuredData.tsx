interface StructuredDataProps {
  data: object
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Hüsnü Usta Mobilya",
  "description": "30 yıllık deneyimimizle kaliteli ve özel tasarım mobilyalar üretiyoruz.",
  "url": "https://husnuustamobilya.com",
  "logo": "https://husnuustamobilya.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+90-352-123-45-67",
    "contactType": "customer service",
    "areaServed": "TR",
    "availableLanguage": "Turkish"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Atatürk Mahallesi, Mobilya Sokak No:15",
    "addressLocality": "Kayseri",
    "addressCountry": "TR"
  },
  "sameAs": [
    "https://www.facebook.com/husnuustamobilya",
    "https://www.instagram.com/husnuustamobilya",
    "https://www.linkedin.com/company/husnuustamobilya"
  ]
}

// Local Business Schema
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "name": "Hüsnü Usta Mobilya",
  "description": "Kaliteli ahşap mobilya üretimi ve satışı",
  "url": "https://husnuustamobilya.com",
  "telephone": "+90-352-123-45-67",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Atatürk Mahallesi, Mobilya Sokak No:15",
    "addressLocality": "Kayseri",
    "postalCode": "38000",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.7312,
    "longitude": 35.4888
  },
  "openingHours": [
    "Mo-Sa 09:00-18:00",
    "Su 10:00-16:00"
  ],
  "priceRange": "$$",
  "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
  "currenciesAccepted": "TRY"
}

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Hüsnü Usta Mobilya",
  "url": "https://husnuustamobilya.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://husnuustamobilya.com/products?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}