import "./globals.css";
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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
