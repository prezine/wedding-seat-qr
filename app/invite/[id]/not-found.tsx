import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-rose-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-rose-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Invitation Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            We couldn't find the invitation you're looking for. Please check the QR code or link and try again.
          </p>
          <Link href="/auth/login">
            <Button className="bg-rose-600 hover:bg-rose-700">Go to Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
