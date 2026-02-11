import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      patientId,
      date,
      timeSlot,
      sessionType,
      mode,
      onlineLink,
      details,
    } = body;

    if (!patientId || !date || !timeSlot || !sessionType || !mode) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const session = await prisma.session.create({
      data: {
        patientId,
        date: new Date(date),
        timeSlot,
        sessionType,
        mode,
        onlineLink: onlineLink || null,
        details: details || null,
      },
    });

    return NextResponse.json(session, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create session", err },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sessions = await prisma.session.findMany({
      include: { patient: true },
      orderBy: { date: "desc" },
      take: 20,
    });

    return NextResponse.json(sessions);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch sessions", err },
      { status: 500 }
    );
  }
}
