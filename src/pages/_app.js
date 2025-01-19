import DynamicAuthProvider from "@/components/DynamicAuthProvider";
import { ToastProvider } from "@/Context/TostContext"; //  
import "@/styles/globals.css";
export default function App({ Component, pageProps }) {
  return (
    <ToastProvider>
      <DynamicAuthProvider>
        <Component {...pageProps} />
      </DynamicAuthProvider>
    </ToastProvider>
  );
}
