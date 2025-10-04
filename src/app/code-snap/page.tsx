import Image from "next/image";

export default function CodeSnapPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="max-w-full max-h-full">
        <Image
          src="/Code_snap.png"
          alt="Code Snap"
          width={1200}
          height={800}
          className="max-w-full h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}