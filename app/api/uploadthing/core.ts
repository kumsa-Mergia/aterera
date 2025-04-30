import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

// Create UploadThing instance
const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: "32MB"  // Only PDFs, max 32MB
    },
  }) 
    .middleware(async ({ req }) => {
      // Check current user and log to ensure it's correctly retrieved
      // const user = await auth(req);
      const user = await currentUser();
      console.log("Current user:", user); // Debugging line

      // If no user, throw Unauthorized error
      if (!user) throw new UploadThingError("Unauthorized");

      // Returning userId as metadata
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Log after upload completes
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);

      // Return userId and file info to frontend
      return { userId: metadata.userId, file: file };
    }),
} satisfies FileRouter; // Ensures the correct typing for the file router

// Export the router type for use in the frontend
export type OurFileRouter = typeof ourFileRouter;
