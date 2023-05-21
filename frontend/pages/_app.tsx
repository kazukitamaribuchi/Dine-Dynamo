import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider as JotaiProvider } from "jotai";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <JotaiProvider>
        <Component {...pageProps} />
      </JotaiProvider>
    </UserProvider>
  );
}
