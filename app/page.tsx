import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { Plus, MessageSquare, Users, BookOpen, FileQuestion, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { CreateAgentDialog } from "@/components/create-agent-dialog";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const agents = await prisma.agent.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      messages: true,
      leads: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const totalMessages = agents.reduce((sum, agent) => sum + agent.messages.length, 0);
  const totalLeads = agents.reduce((sum, agent) => sum + agent.leads.length, 0);
  const messageLimit = 40; // Example limit

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold">GaliChat</div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/agents">My AI Agents</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/discover">Discover</Link>
            </Button>
            <Button variant="ghost">Become a partner</Button>
            <Button variant="ghost">Billing</Button>
            <Button variant="ghost">Account</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total AI Agents</h3>
                <p className="text-2xl font-bold mt-1">{agents.length}/1</p>
                <p className="text-sm text-gray-500 mt-1">Number of AI Agents created.</p>
              </div>
              <MessageSquare className="h-8 w-8 text-gray-400" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Messages</h3>
                <p className="text-2xl font-bold mt-1">{totalMessages}/{messageLimit}</p>
                <p className="text-sm text-gray-500 mt-1">Consumed messages this month.</p>
              </div>
              <MessageSquare className="h-8 w-8 text-gray-400" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
                <p className="text-2xl font-bold mt-1">{totalLeads}</p>
                <p className="text-sm text-gray-500 mt-1">Number of leads captured.</p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </Card>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Build your AI Agents</h2>
          <p className="text-gray-500 mb-6">Craft customized AI Agents for your business and customer support.</p>
          
          <div className="grid grid-cols-3 gap-6">
            <CreateAgentDialog>
              <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadowbg-[url('https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]  inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center text-white aspect-[5/3] flex flex-col items-center justify-center rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 mx-auto mb-4"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd"></path></svg>
                <p className="text-lg font-medium">Create AI Agent</p>
              </Card>
            </CreateAgentDialog>

            {agents.map((agent) => (
              <Link key={agent.id} href={`/agents/${agent.id}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow aspect-[5/3]">
                  <h3 className="font-semibold mb-2">{agent.name}</h3>
                  <p className="text-sm text-gray-500">ID: {agent.chatHash}</p>
                  <p className="text-sm text-gray-500">Created: {new Date(agent.createdAt).toLocaleDateString()}</p>
                  <Button variant="outline" className="mt-4">View AI Agent</Button>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2">Get started with Gali AI Agent</h2>
          <p className="text-gray-500 mb-6">Explore our comprehensive tutorials to kickstart your journey with Gali AI Agent.</p>
          
          <div className="grid grid-cols-3 gap-6">
            <Card className="p-6">
              <BookOpen className="h-8 w-8 text-gray-400 mb-4" />
              <h3 className="font-semibold mb-2">Our Beginner's Guide</h3>
              <p className="text-sm text-gray-500 mb-4">Crawl your website pages automatically. Train the bot with specific texts that.</p>
              <Button variant="outline">Start Learning</Button>
            </Card>

            <Card className="p-6">
              <FileQuestion className="h-8 w-8 text-gray-400 mb-4" />
              <h3 className="font-semibold mb-2">FAQ Section</h3>
              <p className="text-sm text-gray-500 mb-4">Attach files to train your bot. Supported formats .pdf, .doc, .docx, .csv or .txt.</p>
              <Button variant="outline">View More</Button>
            </Card>

            <Card className="p-6">
              <FileText className="h-8 w-8 text-gray-400 mb-4" />
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-sm text-gray-500 mb-4">Train the bot with specific texts that cannot be found on any public area of your website or docs.</p>
              <Button variant="outline">Check Docs</Button>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}