import type { Metadata } from "next";
import "./globals.css";
import { ApolloWrapper } from "@/contexts/ApolloWrapper";
import { ThemeWrapper } from "@/contexts/ThemeWrapper";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Incidents",
  description: "Track incidents and manage your team's response.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <ApolloWrapper>
        <ThemeWrapper>
          <body className="bg-white dark:bg-[#18181b] text-gray-900 dark:text-gray-100">
            {children}
            <ToastContainer
              position="bottom-right"
              pauseOnFocusLoss={false}
              pauseOnHover={false}
            />
          </body>
        </ThemeWrapper>
      </ApolloWrapper>
    </html>
  );
}
