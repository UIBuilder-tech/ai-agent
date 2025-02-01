import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { AnalyticsDashboard } from "@/components/analytics-dashboard";

export default async function AnalyticsPage({
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
      analytics: true,
      messages: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 100
      },
      leads: true
    }
  });

  if (!agent) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
        <AnalyticsDashboard agent={agent} />
      </div>
    </div>
  );
}