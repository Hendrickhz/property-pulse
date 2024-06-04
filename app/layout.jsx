import "@/assets/css/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "Property Pulse | Find Your Perfect Rental",
  description: "Find Your Dream Rental",
  keywords: ["rent", "property", "rental"],
};
const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className=" flex flex-col min-h-[100vh]">
        <Navbar />
        <div>{children}</div>
        <Footer/>
      </body>
    </html>
  );
};

export default MainLayout;
