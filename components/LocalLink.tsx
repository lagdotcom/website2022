import Link from "next/link";

export default function LocalLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return <Link href={href}>{label}</Link>;
}
