import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
  title: "Easel",
  description: "A website for my art",
};

export default function RootLayout({ children }) {
  const year = new Date().getFullYear().toString();
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Easel</title>
      </head>
      <ClerkProvider>
        <body>
          <div id="root">{children}</div>
          <footer className="footer">
            <p>
              Copyright {"©"} {year} Adithya Ubaradka
            </p>
          </footer>
        </body>
      </ClerkProvider>
    </html>
  );
}
