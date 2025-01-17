import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    {params}: {params: {courseId: string}}
) {
    try{
        const {userId} = auth();

        if(!userId){
            return new NextResponse("No autorizado", {status: 401});
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            }
        });

        if(!course){
            return new NextResponse("No se encontró", {status: 404});
        }

        const unpublishedCourse = await db.course.update({
            where: {
                id: params.courseId,
                userId,
            },
            data: {
                isPublished: false,
            }
        });

        return NextResponse.json(unpublishedCourse);

    } catch(error){
        console.log("[COURSE_ID_UNPUBLISH]", error);
        return new NextResponse("Error interno", {status: 500 });
    }
}