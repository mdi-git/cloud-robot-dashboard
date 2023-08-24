import store from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export let persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <div className="p-12">
          <Component {...pageProps} />
        </div>
        </PersistGate>
      
      </Provider>
    </>
  );
}
