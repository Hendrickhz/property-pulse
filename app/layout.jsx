import "@/assets/css/globals.css";
import "photoswipe/dist/photoswipe.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "@/context/GlobalContext";
export const metadata = {
  title: "Property Pulse | Find Your Perfect Rental",
  description: "Find Your Dream Rental",
  keywords: ["rent", "property", "rental"],
};
const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <head>
            <link rel="icon" href="/logo.png" sizes="any" />
          </head>
          <body className=" flex flex-col min-h-[100vh]">
            <Navbar />
            <div>{children}</div>
            <Footer /> <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
