import "@/assets/css/globals.css";
export const metadata = {
  title: "Property Pulse | Find Your Perfect Rental",
  description: "Find Your Dream Rental",
  keywords: ["rent", "property", "rental"],
};
const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
