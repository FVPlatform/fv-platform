"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";

interface LabelCatFormProps {
    initialData: Course;
    courseId: string;
    labelOptions: { label: string; value: string; }[];
};

const formSchema = z.object({
    labelCatId: z.string().min(1),
});

export const LabelCatForm = ({
    initialData,
    courseId,
    labelOptions
}: LabelCatFormProps ) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    console.log("Options in LabelCatForm:", labelOptions);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            labelCatId: initialData?.labelCatId || ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Curso actualizado");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Algo salio mal");
        }
    }

    const selectedOption = labelOptions.find((labelOption) => labelOption.value === initialData.labelCatId);
    const handleComboboxChange = (value: string) => {
        form.setValue('labelCatId', value);
    };

    return ( 
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Etiqueta del curso
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancelar</>
                    ): (
                        <>
                        <Pencil className="h-4 w-4 mr-2"/>
                            Editar etiqueta
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn("text-sm mt-2", !initialData.labelCatId && "text-slate-500 italic")}>
                    {selectedOption?.label || "No hay etiqueta"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="labelCatId"
                            render = {({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Combobox
                                            options={labelOptions}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid || isSubmitting} type="submit">
                                Guardar
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
     );
}