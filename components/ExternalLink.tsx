import Link from "next/link";

export default function ExternalLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <a target="_blank">{label}</a>
    </Link>
  );
}
