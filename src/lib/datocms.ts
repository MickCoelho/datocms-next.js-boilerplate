import { GraphQLClient } from 'graphql-request';

const { API_URL } = process.env;
const { DATOCMS_API_TOKEN } = process.env;

interface iDatoCMSRequest {
  query: string;
  variables?: Record<string, unknown>;
  preview?: boolean;
}

const datoCmsRequest = async ({
  query,
  variables,
  preview,
}: iDatoCMSRequest): Promise<Record<string, never>> => {
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

  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;

  /*
  const endpoint: string = preview ? `${API_URL}preview` : API_URL;

  const client = new GraphQLClient(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${DATOCMS_API_TOKEN}`,
    },
  });
  console.log(
    '------------------------------------------------------------------------',
  );

  console.log('variables: ', variables);
  console.log('query: ', query);

  return client.request(query, variables);
  */
};

export default datoCmsRequest;
