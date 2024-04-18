const initMSW = async () => {
  if (typeof window === "undefined") {
    (async () => {
      const { server } = await import("../mocks/server");

      server.listen({ onUnhandledRequest: "bypass" });
    })();
  } else {
    (async () => {
      const { worker } = await import("../mocks/browser");

      worker.start({ onUnhandledRequest: "bypass" });
    })();
  }
};

initMSW();

export {};
