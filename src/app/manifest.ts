import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mechanic ERP",
    short_name: "Mechanic",
    description: "Mechanic service workflow dashboard",
    start_url: "/dashboard",
    scope: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#f8fafc",
    icons: [
      {
        src: "/onlylogo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
