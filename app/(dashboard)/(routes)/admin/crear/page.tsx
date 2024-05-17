"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

// Esquema de validación para el formulario
const formSchema = z.object({
    title: z.string().min(1, {
        message: "Titulo requerido",
    }),
});

const CrearPage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const { isSubmitting, isValid } = form.formState;
    
    // Función para manejar el envío del formulario
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", values);
            router.push(`/admin/courses/${response.data.id}`);
            toast.success("Curso creado");
        } catch {
            toast.error("Algo salio mal");
        }
    }

    return ( 
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Nombra el curso
                </h1>
                <p className="text-sm text-gray-600 mt-2">
                    ¿Cómo te gustaría nombrar el curso? No te preocupes, puedes cambiarlo después.
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Título del curso
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="Ejemplo, Curso de aprendizaje"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Ten en cuenta el contenido del curso
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-between">
                            <Link href="/">
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                Continuar
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
     );
}
 
export default CrearPage;