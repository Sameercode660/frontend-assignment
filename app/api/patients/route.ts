import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      mobileNumber,
      whatsappNumber,
      email,
      address,
    } = body;

    if (!name || !mobileNumber || !whatsappNumber) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // if patient already exists by mobile, return it
    const existing = await prisma.patient.findUnique({
      where: { mobileNumber },
    });

    if (existing) {
      return NextResponse.json(existing, { status: 200 });
    }

    const patient = await prisma.patient.create({
      data: {
        name,
        mobileNumber,
        whatsappNumber,
        email: email || null,
        address: address || null,
      },
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong", err },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    const patients = await prisma.patient.findMany({
      where: {
        OR: [
          { mobileNumber: { contains: q } },
          { name: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return NextResponse.json(patients);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch patients", err },
      { status: 500 }
    );
  }
}
