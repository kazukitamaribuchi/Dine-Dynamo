import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider as JotaiProvider } from "jotai";
import { Auth0Provider } from "@auth0/auth0-react";

export default function App({ Component, pageProps }: AppProps) {
  // TODO envなどから参照する
  const domain = "dev-mrasghjtrmn3r558.us.auth0.com";
  const clientId = "QZrar4DDSMp7plORGOftFo9HmBtUG6Ul";
  const redirectUri = "http://localhost:8000/dashboard";
  // const audience = "https://dev-mrasghjtrmn3r558.us.auth0.com/api/v2/";
  // const scope = "read:current_user update:current_user_metadata";

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        // audience: audience,
        // scope: scope,
      }}
    >
      <JotaiProvider>
        <Component {...pageProps} />
      </JotaiProvider>
    </Auth0Provider>
  );
}
