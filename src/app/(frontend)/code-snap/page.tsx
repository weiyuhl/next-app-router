import Image from "next/image";

export default function CodeSnapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <Image
          src="/Code_snap.png"
          alt="Code Snap"
          width={1200}
          height={800}
          className="w-full max-w-4xl h-auto object-contain"
        />
      </div>
    </div>
  )
}



