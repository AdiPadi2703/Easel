import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Footer from "./Components/Footer/Footer";

export const metadata = {
  title: "Easel",
  description: "A website for my art",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Easel</title>
      </head>
      <ClerkProvider>
        <body>
          <div className="holder">
            <div id="root">{children}</div>
            <Footer />
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
