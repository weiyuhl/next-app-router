export default function CodeSnapPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="max-w-full max-h-full">
        <img
          src="/Code_snap.png"
          alt="Code Snap"
          className="max-w-full h-auto object-contain"
          style={{ maxWidth: '1200px', maxHeight: '800px' }}
        />
      </div>
    </div>
  );
}