import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPagesSlugs } from '../../lib/api';
import { CMSPage } from '../../interfaces';

const preview = async (
  req: NextApiRequest,
  res: NextApiResponse,
  // eslint-disable-next-line consistent-return
): Promise<any> => {
  // Check the secret and next parameters
  // // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.DATOCMS_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // // Fetch the headless CMS to check if the provided `slug` exists
  const allPages: CMSPage[] = await getAllPagesSlugs();
  const currentPage = allPages.filter(
    (page) => `/${page.slug}` === req.query.slug,
  )[0];

  // // If the slug doesn't exist prevent preview mode from being enabled
  if (!currentPage.slug && currentPage.slug !== '') {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/${currentPage.slug}` });
  res.end();
};

export default preview;
