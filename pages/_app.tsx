import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import ErrorBoundary from "@/components/ErrorBoundary";
import GlobalStyle from "@/styles/GlobalStyle";
import Toast from "@/components/Toast";
import Socket from "@/components/Socket/Socket";
import Loading from "@/components/common/Loading";

export default function App({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === "development") {
    if (typeof window === "undefined") {
      (async () => {
        const { server } = await import("../mocks/server");
        server.listen();
      })();
    } else {
      (async () => {
        const { worker } = await import("../mocks/browser");
        worker.start();
      })();
    }
  }

  return (
    <>
      <ErrorBoundary>
        <RecoilRoot>
          <GlobalStyle />
          <Toast />
          <Component {...pageProps} />
          <Socket />
          <Loading />
        </RecoilRoot>
      </ErrorBoundary>
    </>
  );
}
