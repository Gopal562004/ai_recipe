import "../../../styles/globals.css";
export const metadata = {
  title: "Login",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900">{children}</body>
    </html>
  );
}
