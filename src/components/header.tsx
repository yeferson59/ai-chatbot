"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border/40 bg-card/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo y título */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/90 shadow-sm group-hover:bg-primary transition-colors">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              AI Chat
            </span>
          </Link>

          {/* Navegación central */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors py-1 border-b-2 border-transparent hover:border-primary"
            >
              Inicio
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors py-1 border-b-2 border-transparent hover:border-primary"
            >
              Características
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors py-1 border-b-2 border-transparent hover:border-primary"
            >
              Acerca de
            </Link>
          </nav>

          {/* Botones de autenticación */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-lg bg-primary/90 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary transition-colors shadow-sm">
                  Iniciar sesión
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center space-x-3">
                <span className="hidden sm:inline text-sm text-foreground/80">
                  Mi cuenta
                </span>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8",
                      userButtonPopoverCard:
                        "bg-card border border-border shadow-lg",
                      userButtonPopoverActionButton:
                        "text-foreground hover:bg-secondary",
                      userButtonPopoverActionButtonIcon: "text-foreground",
                      userButtonPopoverFooter: "border-t border-border",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
