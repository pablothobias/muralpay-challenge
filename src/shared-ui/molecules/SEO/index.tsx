import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  noindex?: boolean;
}

const defaultDescription =
  'MuralPay - Your secure platform for money transfers and account management';
const defaultTitle = 'MuralPay - Secure Money Transfer Platform';
const defaultOGImage = '/assets/images/og-image.jpg';

export const getPageMetadata = (pathname: string): { title: string; description: string } => {
  switch (pathname) {
    case '/':
      return {
        title: 'Home | MuralPay',
        description: 'MuralPay dashboard - Manage your transfers and accounts securely',
      };
    case '/accounts':
      return {
        title: 'Manage Accounts | MuralPay',
        description: 'Manage your MuralPay accounts - Add, edit, and view your financial accounts',
      };
    case '/transfers':
      return {
        title: 'Transfers | MuralPay',
        description: 'Send and receive money securely with MuralPay transfer system',
      };
    case '/register':
      return {
        title: 'Register Organization | MuralPay',
        description: 'Create your MuralPay account - Start managing your finances securely',
      };
    default:
      return {
        title: defaultTitle,
        description: defaultDescription,
      };
  }
};

export const SEO: React.FC<SEOProps> = ({
  title: customTitle,
  description: customDescription,
  ogImage = defaultOGImage,
  noindex = false,
}) => {
  const router = useRouter();
  const pageMetadata = getPageMetadata(router.pathname);

  const title = customTitle || pageMetadata.title;
  const description = customDescription || pageMetadata.description;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}${router.pathname}`} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {noindex && <meta name="robots" content="noindex,nofollow" />}
    </Head>
  );
};
