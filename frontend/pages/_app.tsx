import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { LocalStreamProvider, PeerConnectionsProvider } from "@/context";
import ErrorBoundary from "@/components/ErrorBoundary";
import GlobalStyle from "@/styles/GlobalStyle";
import { Loading } from "@/components/common/";
if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  import("../mocks");
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <ErrorBoundary>
        <LocalStreamProvider>
          <PeerConnectionsProvider>
            <RecoilRoot>
              <GlobalStyle />
              {getLayout(<Component {...pageProps} />)}
              <Loading />
            </RecoilRoot>
          </PeerConnectionsProvider>
        </LocalStreamProvider>
      </ErrorBoundary>
    </>
  );
}
