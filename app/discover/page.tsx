import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { AgentCard } from "@/components/agent-card";

export const dynamic = "force-dynamic";

export default async function DiscoverPage() {
  const session = await getServerSession(authOptions);
  
  const agents = await prisma.discoverAgent.findMany({
    where: {
      published: true,
      status: "approved"
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  console.log("AGENTS",agents)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">All AI Agents</h1>
        <p className="text-gray-500 mb-8">
          Discover AI Agents for streamlining communication, each made for specific use cases.
          Find the perfect AI agent for you!
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold mb-6">Business & Marketing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agents
                .filter(agent => agent.category === "human")
                .map(agent => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-6">Programming & Design</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agents
                .filter(agent => agent.category === "programmer")
                .map(agent => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-6">Web 3 & Blockchain</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agents
                .filter(agent => agent.category === "web-3")
                .map(agent => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}