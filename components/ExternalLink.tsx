import Link from "next/link";

export default function ExternalLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Link href={href} target="_blank">{label}</Link>
  );
}
