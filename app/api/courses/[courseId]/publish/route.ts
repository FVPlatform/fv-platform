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

        /*const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);*/

        if(!course.title || !course.description || !course.imageUrl || !course.categoryId /*|| !course.main Recordar agregar*/){
            return new NextResponse("Faltan campos requeridos", {status: 401});
        }

        const publishedCourse = await db.course.update({
            where: {
                id: params.courseId,
                userId,
            },
            data: {
                isPublished: true,
            }
        });

        return NextResponse.json(publishedCourse);

    } catch(error){
        console.log("[COURSE_ID_PUBLISH]", error);
        return new NextResponse("Error interno", {status: 500 });
    }
}