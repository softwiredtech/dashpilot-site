import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/app-icon.png"
      alt="DashKit"
      width={32}
      height={32}
      className="brand-mark"
    />
  );
}
