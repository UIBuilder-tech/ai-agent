import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { name, displayName } = await req.json();

    if (!name || !displayName) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const agent = await prisma.agent.create({
      data: {
        name,
        displayName,
        chatHash: nanoid(),
        userId: session.user.id,
        visualSettings: {
          create: {
            theme: 'light',
            primaryColor: '#3b82f6',
          }
        },
        analytics: {
          create: {
            messageCount: 0,
            leadCount: 0,
            usageStats: {}
          }
        }
      },
      include: {
        visualSettings: true,
        analytics: true,
      }
    });

    return NextResponse.json(agent);
  } catch (error) {
    console.error('[AGENTS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const agents = await prisma.agent.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        visualSettings: true,
        analytics: true,
      }
    });

    return NextResponse.json(agents);
  } catch (error) {
    console.error('[AGENTS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}