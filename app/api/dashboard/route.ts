import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const now = new Date();

    const upcomingSessions = await prisma.session.findMany({
      where: {
        date: {
          gte: now,
        },
      },
      include: {
        patient: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    const pastSessions = await prisma.session.findMany({
      where: {
        date: {
          lt: now,
        },
      },
      include: {
        patient: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json({
      upcomingSessions,
      pastSessions,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
