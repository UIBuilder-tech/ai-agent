import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { AgentTraining } from "@/components/agent-training";

export default async function TrainAgentPage({
  params
}: {
  params: { agentId: string }
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const agent = await prisma.agent.findUnique({
    where: {
      id: params.agentId,
      userId: session.user.id,
    },
    include: {
      trainingData: true,
    }
  });

  if (!agent) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Train Your AI Agent</h1>
        <AgentTraining agent={agent} />
      </div>
    </div>
  );
}