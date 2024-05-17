import { isAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId || !isAdmin(userId)) {
        return new NextResponse("No autorizado", {status: 401});
    }

    const course = await db.course.create({
        data: {
            userId,
            title,
        }
    });

    return NextResponse.json(course);

  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Error interno", { status: 500});
  }
}
