// import Footer from "./comps/Footer";
import "./globals.css";
import Navbar from "./navbar";
import Provider from "./provider";

export const metadata = {
  title: "Kichir",
  description: "Micor-Bloging site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Navbar />
          {children}
          {/* <Footer /> */}
        </Provider>
      </body>
    </html>
  );
}
