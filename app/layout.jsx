import "@/assets/css/globals.css";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "Property Pulse | Find Your Perfect Rental",
  description: "Find Your Dream Rental",
  keywords: ["rent", "property", "rental"],
};
const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
