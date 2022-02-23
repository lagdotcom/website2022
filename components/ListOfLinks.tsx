import { useMemo } from "react";

import ExternalLink from "./ExternalLink";
import LocalLink from "./LocalLink";

type Links = Record<string, string>;

function Interpunct() {
  return <span> · </span>;
}

function generateLinkList(links: Links) {
  const elements: JSX.Element[] = [];
  for (const [label, href] of Object.entries(links)) {
    if (elements.length) elements.push(<Interpunct key={elements.length} />);

    if (href[0] === "/")
      elements.push(<LocalLink key={label} label={label} href={href} />);
    else elements.push(<ExternalLink key={label} label={label} href={href} />);
  }

  return elements;
}

export default function ListOfLinks({ links }: { links: Links }) {
  const elements = useMemo(() => generateLinkList(links), [links]);
  return <span>{elements}</span>;
}
