import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { File, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";
import { LabelCatForm } from "./_components/labelcat-form";

const CourseIdPage = async ({
    params
}: {
    params: {courseId: string}
}) => {
    const {userId} = auth();
    
    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {id: params.courseId, userId}, include: {
            chapters: {
                orderBy: {
                    position: "asc",
                },
            },
            attachments: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    const labels = await db.labelCat.findMany({
        orderBy: {
            name: "asc",
        },
    });

    if (!course){
        return redirect("/");
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.categoryId,
        course.labelCatId,
        course.chapters.some(chapter => chapter.isPublished),
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <>
        {!course.isPublished && (
            <Banner
                label="Este curso no esta publicado. No será visible a los usuarios."
            />
        )}
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl front-medium">
                        Configuracion del curso
                    </h1>
                    <span className="text-sm text-slate-700">
                        Completa todos los campos {completionText}
                    </span>
                </div>
                <Actions
                    disabled={!isComplete}
                    courseId={params.courseId}
                    isPublished={course.isPublished}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon = {LayoutDashboard} />
                        <h2 className="text-xl">
                            Configura el curso
                        </h2>
                    </div>
                    <TitleForm
                        initialData = { course }
                        courseId = {course.id}
                    />
                    <DescriptionForm
                        initialData = { course }
                        courseId = {course.id}
                    />
                    <ImageForm
                        initialData = { course }
                        courseId = {course.id}
                    />
                    <CategoryForm
                        initialData = { course }
                        courseId = {course.id}
                        options={categories.map((category) =>({
                            label: category.name,
                            value: category.id,
                        }))}
                    />
                    <LabelCatForm
                        initialData = { course }
                        courseId = {course.id}
                        labelOptions={labels.map((labelCat) =>({
                            label: labelCat.name,
                            value: labelCat.id,
                        }))}
                    />
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListChecks} />
                            <h2 className="text-xl">
                                Capitulo del curso
                            </h2>
                        </div>
                        <ChaptersForm
                        initialData = { course }
                        courseId = {course.id}
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={File} />
                            <h2 className="text-xl">
                                Recursos & Archivos adjuntos
                            </h2>
                        </div>
                        <AttachmentForm
                        initialData = { course }
                        courseId = {course.id}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default CourseIdPage;