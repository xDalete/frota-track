import Image from "next/image";

type LogoProps = {
  size: number;
  src?: string;
  alt?: string;
};

export default function Logo({ size, src = "/logo.png", alt = "Logo" }: LogoProps) {
  return <Image src={src} alt={alt} width={size} height={size} />;
}
