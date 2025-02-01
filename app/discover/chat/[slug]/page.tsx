import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { AgentChatView } from "@/components/agent-chat-view";
import { ShareButtons } from "@/components/share-buttons";

export const dynamic = "force-dynamic";

export default async function AgentChatPage({
  params
}: {
  params: { slug: string }
}) {
  const session = await getServerSession(authOptions);

  const agent = await prisma.discoverAgent.findUnique({
    where: {
      slug: params.slug,
      published: true,
      status: "approved"
    }
  });

  if (!agent) {
    redirect("/discover");
  }

  const chatConfig = await prisma.agentChat.findUnique({
    where: {
      chatHash: agent.chatHash
    }
  });

//   if (!chatConfig) {
//     redirect("/discover");
//   }

console.log("chatConfig",agent)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center text-sm mb-8">
            <a href="/" className="text-gray-500 hover:text-gray-900">Home</a>
            <span className="mx-2 text-gray-500">/</span>
            <a href="/discover" className="text-gray-500 hover:text-gray-900">Discover</a>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-900">{agent.title}</span>
          </nav>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{agent.title}</h1>
            <p className="text-gray-500 mb-6">{agent.description}</p>
            <p className="text-sm text-gray-400">by {agent.username}</p>
          </div>

          <div className="mb-8">
            <ShareButtons 
              title={agent.title}
              description={agent.description}
              socialLinks={agent.socialLinks}
            />
          </div>

          <AgentChatView config={chatConfig} />

          <p className="text-center text-sm text-gray-400 mt-8">
            Create your own AI Agent like this one for free. Train it with your own data and customize it to your needs.
          </p>
        </div>
      </div>
    </div>
  );
}