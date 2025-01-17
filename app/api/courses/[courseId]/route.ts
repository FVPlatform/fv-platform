import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: {courseId: string}}
) {
    try {
        const {userId} = auth();

        if(!userId) {
            return new NextResponse("No autorizado", {status: 401});
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            }
        });

        if(!course){
            return new NextResponse("No se encontró", {status: 404});
        }

        const deletedCourse = await db.course.delete({
            where: {
                id: params.courseId,
            },
        });

        return NextResponse.json(deletedCourse);

    } catch (error){
        console.log("[COURSE_ID_DELETE]", error);
        return new NextResponse("Error interno", {status: 500});
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: {courseId: string}}
) {
    try {
        const { userId } = auth();
        const {courseId } = params;
        const values = await req.json();

        if (!userId){
            return new NextResponse("No autorizado", {status: 401});
        }

        const course = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {...values,}
        });

        return NextResponse.json(course);

    } catch (error) {
        console.log("[COURSE_ID]", error);
        return new NextResponse("Error interno", {status:500});
    }
}