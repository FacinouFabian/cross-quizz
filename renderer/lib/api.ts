import { GraphQLClient } from 'graphql-request'
import NextConfig from 'next/config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function api<T>(query: string, variables: Record<string, string> = {}): Promise<T> {
  const client = new GraphQLClient(`${NextConfig().publicRuntimeConfig.apiBaseUrl}/graphql`, {
    headers: {},
  })
  return client.request(query, variables)
}
