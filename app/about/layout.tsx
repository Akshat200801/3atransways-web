import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Fourteen years of moving impossible cargo. Learn how Three A Transways grew from a single Jaipur brokerage into a full-stack international logistics partner.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
