"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, User, Users, Phone, Armchair } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AddInviteeModal } from "@/components/add-invitee-modal";
import type { Invitee } from "@/lib/storage";

export function InviteesList({
  invitees,
  onRefresh,
}: {
  invitees: Invitee[];
  onRefresh: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    onRefresh();
  };

  if (invitees.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
          <Users className="h-8 w-8 text-rose-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No guests yet</h3>
        <p className="text-muted-foreground mb-6">
          Start building your guest list by adding your first invitee
        </p>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-rose-600 hover:bg-rose-700 gap-2"
        >
          <Plus className="h-4 w-4" />
          Add First Guest
        </Button>
        <AddInviteeModal isOpen={isModalOpen} onClose={handleModalClose} />
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-rose-600 hover:bg-rose-700 gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Guest
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {invitees.map((invitee) => (
          <Link key={invitee.id} href={`/dashboard/invitee/${invitee.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-rose-100 hover:border-rose-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                      {invitee.status === "Family" ? (
                        <Users className="h-6 w-6 text-rose-600" />
                      ) : (
                        <User className="h-6 w-6 text-rose-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-balance">
                        {invitee.name}
                      </h3>
                      <Badge
                        variant={
                          invitee.status === "Family" ? "default" : "secondary"
                        }
                        className="mt-1"
                      >
                        {invitee.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{invitee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Armchair className="h-4 w-4" />
                    <span>Seat {invitee.seat_number}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <AddInviteeModal isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  );
}
