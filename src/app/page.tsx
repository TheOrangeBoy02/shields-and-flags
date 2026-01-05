import Game from "@/components/Game";
import ShieldIcon from "@/components/icons/ShieldIcon";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="pt-12 pb-8 text-center flex flex-col items-center gap-4">
        <ShieldIcon className="w-16 h-16 text-[var(--color-standard)]" filled={false} />
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          <span className="text-[var(--color-stature)]">SHIELDS</span>
          <span className="text-[var(--color-electric)]">&</span>
          <span className="text-[var(--color-stature)]">FLAGS</span>
        </h1>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex items-center justify-center px-4">
        <Game />
      </main>

      {/* Banner Ad Section */}
      <footer className="bg-[var(--color-electric)] py-6 text-center">
        <p className="text-white text-lg font-medium">Banner Ad Section</p>
      </footer>
    </div>
  );
}
