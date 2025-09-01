import client from "../../lib/apolloClient";

import { DocumentNode } from "@apollo/client/core";

export async function fetchGraphQL(
  query: DocumentNode,
  variables?: Record<string, unknown>
) {
  const { data } = await client.query({
    query,
    variables,
  });
  return data;
}
