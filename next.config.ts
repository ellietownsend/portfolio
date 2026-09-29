import type { NextConfig } from "next";
import { siteConfig } from "./app/site.config.js"

const nextConfig: NextConfig = {
  redirects(){
    return[
      {
        source: '/',
        destination: '/refactoring',
        permanent: siteConfig.underRefactor,
      },
    ]
  },
  /* config options here */
};

export default nextConfig;
