"use client";

import { z } from "zod";
import UpladFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";

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
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      console.log("Files: ", res);
      toast.success("Uploaded successfully!");
     
    },

    onUploadError: (error: Error) => {
      toast.error(
        <div>
          <p className="font-bold">Upload Error</p>
          <p className="text-sm">{error.message}</p>
        </div>
      );
    },
  });


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      toast.error(
        <div>
          <p className="font-bold">Invalid File</p>
          <p className="text-sm">
            {validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"}
          </p>
        </div>
      );
      return;
    }

    toast("Uploading PDF...");

    const resp = await startUpload([file]);
    if (!resp) {
      toast.error(
        <div>
          <p className="font-bold">Something went wrong</p>
          <p className="text-sm">Please use a different file</p>
        </div>
      );
      return;
    }

    toast("Processing PDF... Hang tight! Our AI is reading your document.");
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UpladFormInput onSubmit={handleSubmit} />
    </div>
  );
}
