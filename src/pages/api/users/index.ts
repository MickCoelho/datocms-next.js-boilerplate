import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers } from '../../../lib/api';

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> => {
  const users = await getUsers();

  try {
    if (!Array.isArray(users)) {
      throw new Error('Cannot find user data');
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
