import "./globals.css";

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

      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
