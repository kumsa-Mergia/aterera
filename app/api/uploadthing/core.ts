// 🔐 Import Clerk's server-side method to get the current authenticated user
import { currentUser } from "@clerk/nextjs/server";

// ❗ UploadThingError lets us throw meaningful errors during upload steps
import { UploadThingError } from "uploadthing/server";

// 🛠️ Core UploadThing functions to define a router for file uploads
import { createUploadthing, type FileRouter } from "uploadthing/next";

// Initialize UploadThing's helper
const f = createUploadthing();

// ✅ Define your FileRouter with a named endpoint "pdfUploader"
export const ourFileRouter = {
  // This is the endpoint name you'll use in <UploadButton endpoint="pdfUploader" />
  pdfUploader: f({ 
    // Accept only PDF files up to 32MB
    pdf: { maxFileSize: "32MB" } 
  })

    // 🔐 Middleware runs *before* the upload is allowed.
    // Here we use Clerk to check if the user is authenticated.
    .middleware(async () => {
      // Get the current user from Clerk
      const user = await currentUser();

      // If not logged in, block the upload with an error
      if (!user) {
        throw new UploadThingError("Unauthorized");
      }

      // ✅ This data is passed as `metadata` to onUploadComplete
      return { userId: user.id };
    })

    // ✅ This runs *after* the file is successfully uploaded
    .onUploadComplete(async ({ metadata, file }) => {
      // You now have access to the user ID and file URL
      console.log("upload completed for user id", metadata.userId);
      console.log("file url", file.url);

      // You can store this info in a DB or return it to the client
      return { userId: metadata.userId, file };
    }),
} satisfies FileRouter; // ✅ Type check the object matches FileRouter format

// 🧠 Export the type for use with UploadThing React components (like UploadButton)
export type OurFileRouter = typeof ourFileRouter;
