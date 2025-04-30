"use client";

import { z } from "zod";
import UpladFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

export default function UploadForm() {
  


  // const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
  //   onClientUploadComplete: () => {
  //     console.log("uploaded successfully!");
  //   },
  //   onUploadError: (err) => {
  //     console.error("error occurred while uploading", err);
  //   },
  //   onUploadBegin: ({ file }) => {
  //     console.log("upload has begun for", file);
  //   },
  // });
  const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
    onClientUploadComplete: (res) => {
      // Do something with the response
      console.log("Files: ", res);
      console.log("uploaded successfully!");
    },
    onUploadError: (error: Error) => {
      // Do something with the error.
      console.log(`ERROR! ${error.message}`);
    },
  });

  

  


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submited");
    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;

    //validating the fields
    const validatedFields = schema.safeParse({ file });

    console.log(validatedFields);

    if (!validatedFields.success) {
      console.log(
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      return;
    }
    //schema with zod
    //upload the file to uploadthing

    const resp = await startUpload([file]);
    if (!resp) {
      return;
    }
    //parse the pdf using lang chain
    //summarize the PDF using AI
    //save the summary to the database
    //redirect to the [id] summary page
  };

  
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UpladFormInput onSubmit={handleSubmit} />
    </div>
  );
}
