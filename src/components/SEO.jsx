
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://clipshare06.vercel.app";

function SEO({
  title,
  description,
  path = "/",
}) {
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      {/* Open Graph */}
      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      <meta
        property="og:site_name"
        content="ClipShare"
      />

      {/* Twitter / X */}
      <meta
        name="twitter:card"
        content="summary"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />
    </Helmet>
  );
}

export default SEO;