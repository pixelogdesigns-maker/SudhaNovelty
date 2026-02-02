export const Head = () => {
  // We modify the Wix URL to:
  // 1. Force resize to a square 192x192 (standard icon size) using 'fit' to preserve transparency.
  // 2. Explicitly output as PNG.
  // 3. Add '?v=2' to force the browser to ignore the old cached white-background version.
  const faviconUrl = "https://static.wixstatic.com/media/b9ec8c_8a4424cbc7cf48ea8968507b4cdb3d88~mv2.png/v1/fit/w_192,h_192,al_c/favicon.png?v=2";

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Fonts */}
      <link rel="preconnect" href="https://static.parastorage.com" />
      
      {/* Favicon - Standard */}
      <link rel="icon" href={faviconUrl} type="image/png" sizes="192x192" />
      <link rel="shortcut icon" href={faviconUrl} type="image/png" />
      
      {/* Apple Touch Icon (Prevents iOS from adding a black/white background) */}
      <link rel="apple-touch-icon" href={faviconUrl} />
    </>
  );
};