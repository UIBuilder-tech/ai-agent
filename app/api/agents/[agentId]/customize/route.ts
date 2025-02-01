import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { agentId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { theme, primaryColor, isAutoOpen } = await req.json();

    const agent = await prisma.agent.findUnique({
      where: {
        id: params.agentId,
        userId: session.user.id,
      },
      include: {
        visualSettings: true,
      }
    });

    if (!agent) {
      return new NextResponse('Agent not found', { status: 404 });
    }

    const visualSettings = await prisma.visualSettings.upsert({
      where: {
        agentId: params.agentId,
      },
      update: {
        theme,
        primaryColor,
        isAutoOpen,
      },
      create: {
        agentId: params.agentId,
        theme,
        primaryColor,
        isAutoOpen,
      },
    });

    return NextResponse.json(visualSettings);
  } catch (error) {
    console.error('[AGENT_CUSTOMIZE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}