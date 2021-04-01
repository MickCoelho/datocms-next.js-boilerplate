import { NextApiRequest, NextApiResponse } from 'next';

const exit = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> => {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData();

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: '/' });
  res.end();
};

export default exit;
