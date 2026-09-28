import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "求人検索アプリ",
  description: "求人を検索・投稿できるアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-white">
        <header className="mx-auto w-[50vw] bg-[#2d4358]">
          <div className="flex h-[42px] items-center justify-between px-3">
            {/* ロゴ */}
            <Link
              href="/"
              className="text-[18px] font-bold text-white"
            >
              求人検索アプリ
            </Link>

            {/* メニュー */}
            <nav className="flex items-center gap-4">
              <Link
                href="/"
                className="text-[10px] text-white hover:underline"
              >
                求人検索
              </Link>

              <Link
                href="/new"
                className="text-[10px] text-white hover:underline"
              >
                求人投稿
              </Link>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
