const initMSW = async () => {
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
};

initMSW();

export {};
