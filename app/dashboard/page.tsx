"use client";

import { InviteesList } from "@/components/invitees-list";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Invitee } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      router.push("/");
      return;
    }

    const fetchInvitees = async () => {
      try {
        const response = await fetch("/api/pass");
        const data = await response.json();
        setInvitees(data);
      } catch (error) {
        console.error("Failed to fetch invitees:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitees();
  }, [router]);

  const refreshInvitees = async () => {
    try {
      const response = await fetch("/api/pass");
      const data = await response.json();
      setInvitees(data);
    } catch (error) {
      console.error("Failed to refresh invitees:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
        <p className="text-rose-900">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <header className="border-b border-rose-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-rose-900">
              Wedding Dashboard
            </h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2 border-rose-200 hover:bg-rose-50 bg-transparent"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-serif font-bold text-rose-900">
              Guest List
            </h2>
            <p className="text-muted-foreground mt-1">
              {invitees.length} {invitees.length === 1 ? "guest" : "guests"}{" "}
              invited
            </p>
          </div>
        </div>

        <InviteesList invitees={invitees} onRefresh={refreshInvitees} />
      </main>
    </div>
  );
}
