import { GraphQLClient } from 'graphql-request';

const { API_URL } = process.env;
const { DATOCMS_API_TOKEN } = process.env;

interface iDatoCMSRequest {
  query: string;
  variables: number;
  preview?: boolean;
}

interface iDatoCMSResult {
  result: unknown;
}

const datoCmsRequest = ({
  query,
  variables,
  preview,
}: iDatoCMSRequest): Promise<iDatoCMSResult> => {
  if (!API_URL) {
    throw new Error(
      'Unexpected error: Missing API_URL in environment variable',
    );
  }
  if (!DATOCMS_API_TOKEN) {
    throw new Error(
      'Unexpected error: Missing DATOCMS_API_TOKEN in environment variable',
    );
  }
  const endpoint: string = preview ? `${API_URL}preview` : API_URL;

  const client = new GraphQLClient(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${DATOCMS_API_TOKEN}`,
    },
  });

  return client.request(query, variables);
};

export default datoCmsRequest;
