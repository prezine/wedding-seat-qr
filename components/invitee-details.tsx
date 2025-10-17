"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Users, Phone, Armchair, Trash2, Download } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { useRouter } from "next/navigation"
import { storage, type Invitee } from "@/lib/storage"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function InviteeDetails({ invitee }: { invitee: Invitee }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const inviteUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/invite/${invitee.id}`

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      storage.deleteInvitee(invitee.id)

      await fetch("/api/pass", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: invitee.id }),
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Error deleting invitee:", error)
      setIsDeleting(false)
    }
  }

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")

      const downloadLink = document.createElement("a")
      downloadLink.download = `${invitee.name}-qr-code.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-rose-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                {invitee.status === "Family" ? (
                  <Users className="h-6 w-6 text-rose-600" />
                ) : (
                  <User className="h-6 w-6 text-rose-600" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-serif text-balance">{invitee.name}</h2>
                <Badge variant={invitee.status === "Family" ? "default" : "secondary"} className="mt-1">
                  {invitee.status}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg">
                <Phone className="h-5 w-5 text-rose-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{invitee.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg">
                <Armchair className="h-5 w-5 text-rose-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Seat Number</p>
                  <p className="font-medium">{invitee.seat_number}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full gap-2" disabled={isDeleting}>
                    <Trash2 className="h-4 w-4" />
                    Delete Guest
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete {invitee.name} from your guest list. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>

        <Card className="border-rose-100">
          <CardHeader>
            <CardTitle>Invitation QR Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center p-6 bg-white rounded-lg border-2 border-rose-100">
              <QRCodeSVG id="qr-code" value={inviteUrl} size={200} level="H" includeMargin />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground text-center">
                Scan this QR code to view the invitation details
              </p>
              <div className="p-3 bg-rose-50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Invitation URL</p>
                <p className="text-sm font-mono break-all">{inviteUrl}</p>
              </div>
            </div>

            <Button onClick={downloadQRCode} variant="outline" className="w-full gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Download QR Code
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
