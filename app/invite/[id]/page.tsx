"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Users, Phone, Armchair, Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import type { Invitee } from "@/lib/storage";

export default function PublicInvitePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [invitee, setInvitee] = useState<Invitee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvitee = async () => {
      try {
        const response = await fetch("/api/pass");
        const passes = await response.json();
        const found = passes.find((p: Invitee) => p.id === id);
        setInvitee(found || null);
      } catch (error) {
        console.error("Error fetching invitee:", error);
        setInvitee(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitee();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center">
        <p className="text-rose-900">Loading...</p>
      </div>
    );
  }

  if (!invitee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center">
        <Card className="border-rose-200 shadow-xl max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-serif">
              Invitation Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              This invitation could not be found. Please check the QR code or
              contact the host.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-rose-900 mb-2 text-balance">
              You're Invited!
            </h1>
            <p className="text-lg text-muted-foreground">
              To celebrate our special day
            </p>
          </div>

          {/* Invitee Card */}
          <Card className="border-rose-200 shadow-xl mb-6">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center shadow-lg">
                  {invitee.status === "Family" ? (
                    <Users className="h-10 w-10 text-white" />
                  ) : (
                    <User className="h-10 w-10 text-white" />
                  )}
                </div>
              </div>
              <CardTitle className="text-3xl font-serif text-balance">
                {invitee.name}
              </CardTitle>
              <Badge
                variant={invitee.status === "Family" ? "default" : "secondary"}
                className="mt-2 text-sm px-4 py-1"
              >
                {invitee.status} Invitation
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <Phone className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Contact Number
                    </p>
                    <p className="font-medium text-lg">{invitee.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <Armchair className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Your Seat</p>
                    <p className="font-medium text-lg">
                      Seat {invitee.seat_number}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wedding Details Card */}
          <Card className="border-rose-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-serif">
                Wedding Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-rose-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date & Time</p>
                  <p className="font-medium text-lg">
                    Saturday, 13th December 2025
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ceremony at 4:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-rose-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Venue</p>
                  <p className="font-medium text-lg">The Azny Place</p>
                  <p className="text-sm text-muted-foreground">
                    Louise Dr, New GRA, Port Harcourt, 500102, Rivers, Nigeria
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-rose-100 rounded-lg text-center">
                <p className="text-sm text-rose-900 font-medium">
                  We can't wait to celebrate with you!
                </p>
                <p className="text-xs text-rose-700 mt-1">
                  Please arrive 15 minutes early for seating
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>Please keep this invitation for entry</p>
          </div>
        </div>
      </div>
    </div>
  );
}
