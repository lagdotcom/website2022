import ExternalLink from "../components/ExternalLink";
import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout>
      <p>I&rsquo;m Lag.Com, a programmer and gamer from the UK.</p>
      <p>
        I helped create{" "}
        <ExternalLink
          label="Diggin' It"
          href="https://lagdotcom.itch.io/diggin-it"
        />
        , a traditional roguelike where you dig and die.
      </p>
    </Layout>
  );
}
