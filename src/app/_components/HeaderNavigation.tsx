import Link from "next/link";
import Image from "next/image";

export default function HeaderNavigation() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        background: "#FFFFFF",
        boxShadow: "0px 3px 16px rgba(110, 110, 110, 0.15)",
      }}
    >
      <Link href="/">
        <Image
          src="/icone-logo-gazeta.svg"
          alt="Gazeta Esportiva"
          width="114"
          height="36"
        />
      </Link>

      <Link href="/">Home</Link>
    </nav>
  );
}
