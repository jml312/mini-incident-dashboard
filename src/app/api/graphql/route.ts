import { createSchema, createYoga } from "graphql-yoga";
import { v4 as uuid } from "uuid";
import type { NextRequest } from "next/server";
import {
  Incident,
  IncidentInput,
  Status,
  Severity,
  IncidentResult,
} from "@/generated/graphql";
import { readFileSync } from "fs";
import { join } from "path";

const incidents: Incident[] = Array.from({ length: 100 }, (_, i) => ({
  id: uuid(),
  title: `Incident ${i + 1}`,
  description: `Description for incident ${i + 1} Description for incident ${
    i + 1
  }Description for incident ${i + 1}Description for incident ${
    i + 1
  }Description for incident ${i + 1}Description for incident ${
    i + 1
  }Description for incident ${i + 1}Description for incident ${
    i + 1
  }Description for incident ${i + 1}Description for incident ${
    i + 1
  }Description for incident ${i + 1}Description for incident ${
    i + 1
  }Description for incident ${i + 1}`,
  severity:
    i % 3 === 0 ? Severity.High : i % 3 === 1 ? Severity.Medium : Severity.Low,
  status: i % 2 === 0 ? Status.Open : Status.Closed,
}));

const typeDefs = readFileSync(
  join(process.cwd(), "src/graphql/schema.graphql"),
  "utf8"
);

const resolvers = {
  Query: {
    incidents: (
      _: unknown,
      args: {
        status?: Status;
        severity?: Severity;
        search?: string;
        limit?: number;
        offset?: number;
      }
    ): IncidentResult => {
      let filtered = incidents;

      if (args.status) {
        filtered = filtered.filter((i) => i.status === args.status);
      }

      if (args.severity) {
        filtered = filtered.filter((i) => i.severity === args.severity);
      }

      if (args.search) {
        const q = args.search.toLowerCase();
        filtered = filtered.filter(
          (i) =>
            i.title.toLowerCase().includes(q) ||
            (i.description?.toLowerCase().includes(q) ?? false)
        );
      }

      const totalCount = filtered.length;
      const paginated = filtered.slice(
        args.offset ?? 0,
        (args.offset ?? 0) + (args.limit ?? filtered.length)
      );

      return {
        items: paginated,
        totalCount,
      };
    },
  },
  Mutation: {
    addIncident: (
      _: unknown,
      { input }: { input: IncidentInput }
    ): Incident => {
      const newIncident = { id: uuid(), ...input };
      incidents.unshift(newIncident);
      return newIncident;
    },
    updateIncident: (
      _: unknown,
      { id, input }: { id: string; input: Incident }
    ) => {
      const index = incidents.findIndex((i) => i.id === id);
      if (index === -1) throw new Error("Not found");
      incidents[index] = { ...incidents[index], ...input };
      return incidents[index];
    },
    deleteIncident: (_: unknown, { id }: { id: string }): boolean => {
      const index = incidents.findIndex((i) => i.id === id);
      if (index === -1) return false;
      incidents.splice(index, 1);
      return true;
    },
  },
};

const yoga = createYoga({
  graphqlEndpoint: "/api/graphql",
  schema: createSchema({ typeDefs, resolvers }),
  fetchAPI: { Response },
});

export { yoga as GET, yoga as POST };
