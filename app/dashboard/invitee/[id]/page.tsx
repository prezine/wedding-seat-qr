"use client";

import { InviteeDetails } from "@/components/invitee-details";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import type { Invitee } from "@/lib/storage"; // ✅ use shared type

export default function InviteeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [invitee, setInvitee] = useState<Invitee | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchInvitee = async () => {
      try {
        const res = await fetch("/pass.json");
        const data = await res.json();

        // Narrow to match strict Invitee type
        const found = data.find((i: any) => i.id === id);

        if (!found) {
          router.push("/dashboard");
        } else {
          // ✅ Ensure the "status" matches your union type
          const mapped: Invitee = {
            ...found,
            status: found.status === "Family" ? "Family" : "Single",
            created_at: found.created_at ?? new Date().toISOString(),
            updated_at: found.updated_at ?? new Date().toISOString(),
          };
          setInvitee(mapped);
        }
      } catch (err) {
        console.error("Failed to load pass.json:", err);
        router.push("/dashboard");
      }
    };

    fetchInvitee();
  }, [id, router]);

  if (!invitee) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <header className="border-b border-rose-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <InviteeDetails invitee={invitee} />
      </main>
    </div>
  );
}
