import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";
import { CourseProgressButton } from "./_components/course-progress-button";

const ChapterIdPage = async ({
    params
}: {
    params: { courseId: string; chapterId: string; }
}) => {
    const { userId } = auth();

    if(!userId) {
        return redirect("/");
    }

    const {
        chapter,
        course,
        attachments,
        nextChapter,
        userProgress,
    } = await getChapter({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
    });

    if(!chapter || !course) {
        return redirect("/");
    }

    const completeOnEnd = !userProgress?.isCompleted;

    return ( 
        <div>
            {userProgress?.isCompleted && (
                <Banner
                    variant="succes"
                    label="Ya has completado este capítulo."
                />
            )}
            <div className="flex flex-col max-w-4xl mx-auto pb-20">
                <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                    <h2 className="text-2xl font-semibold mb-2">
                        {chapter.title}
                    </h2>
                    <CourseProgressButton
                        chapterId={params.chapterId}
                        courseId={params.courseId}
                        nextChapterId={nextChapter?.id}
                        isCompleted={!!userProgress?.isCompleted}
                    />
                </div>
                <Separator/>
                <div>
                    <Preview value={course.description!}/>
                    <Preview value={chapter.description!}/>
                    <Preview value={chapter.video!}/>
                </div>
                {!!attachments.length && (
                    <>
                    <Separator/>
                    <div className="p-4">
                        {attachments.map((attachment) => (
                            <a
                                href={attachment.url}
                                target="_blank"
                                key={attachment.id}
                                className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                            >
                                <File/>
                                <p className="line-clamp-1">
                                    {attachment.name}
                                </p>
                            </a>
                        ))}
                    </div>
                    </>
                )}
            </div>
        </div>
     );
}
 
export default ChapterIdPage;