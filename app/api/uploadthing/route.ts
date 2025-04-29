import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core"; // or correct path to your router file

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
