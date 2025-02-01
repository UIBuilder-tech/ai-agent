import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { CustomizationForm } from "@/components/customization-form";

export default async function CustomizePage({
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
      visualSettings: true
    }
  });

  if (!agent) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Customize Your AI Agent</h1>
        <CustomizationForm agent={agent} />
      </div>
    </div>
  );
}