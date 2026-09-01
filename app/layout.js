import "./globals.css";

export const metadata = {
  title: "NovaEarn",
  description: "Earn rewards with NovaEarn",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
