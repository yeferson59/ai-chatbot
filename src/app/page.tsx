import { Chat } from "@/components/chat";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main>
      <SignedIn>
        <Chat />
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-screen text-center dark">
          <h1 className="text-2xl font-bold mb-4">Bienvenido al Chat con IA</h1>
          <p className="text-muted-foreground mb-6">
            Inicia sesión para comenzar a chatear
          </p>
        </div>
      </SignedOut>
    </main>
  );
}
