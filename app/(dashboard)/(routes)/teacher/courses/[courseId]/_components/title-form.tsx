"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
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

// Se crea la interfaz para indicar los valores que va a recibir el componente, en este caso vamos a recibir el initialData que es un String y el Course Id que tambien lo es
interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

//Se crea el Schema que es aquello que se espera que valide el formulario debido a que se va a inferir el tipo de dato que se esta trabajando en los campos inputs y de esta manera tener manejado los errores y aquello que se introdujo.

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  //Se crea una instancia de de useForm llamado form en el cual se le pasa el schema con el que vamos a trabajar, ademas de eso le hacemos referencia que el resolver (especifica el metodo que va a utilizar para validadr el formulario) es zod, basicamente le decimos, crea un form esta seran las reglas y zod sera quien maneje los errores.

  //El parámetro resolver es un tipo genérico que especifica el método que se utilizará para validar los datos del formulario. En este caso, se utiliza el método zodResolver(), que es proporcionado por la biblioteca Zod. El método zodResolver() utiliza el Schema para validar los datos del formulario.

  //El parámetro defaultValues especifica los valores iniciales del formulario. En este caso, los valores iniciales se establecen en el valor initialData para que el formulario se muestre con los valores predeterminados..

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const router = useRouter();
  //Aqui extraemos las funciones que tiene el hook useForm, estos son isSubmitting para saber si el formulario se esta enviando (esta en proceso) y isValid que establece si lo que se lleno en el formulario cumple con el esquema.
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Title
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default TitleForm;
