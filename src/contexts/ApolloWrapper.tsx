"use client";

import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo";

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
