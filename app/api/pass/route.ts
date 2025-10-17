import { writeFile, readFile } from "fs/promises"
import { join } from "path"
import { type NextRequest, NextResponse } from "next/server"

const PASS_FILE = join(process.cwd(), "public", "pass.json")

export async function GET() {
  try {
    const data = await readFile(PASS_FILE, "utf-8")
    const passes = JSON.parse(data)
    return NextResponse.json(passes)
  } catch (error) {
    // If file doesn't exist, return empty array
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const invitee = await request.json()

    // Read existing passes
    let passes = []
    try {
      const data = await readFile(PASS_FILE, "utf-8")
      passes = JSON.parse(data)
    } catch {
      passes = []
    }

    // Check if invitee already exists and update, otherwise add
    const existingIndex = passes.findIndex((p: any) => p.id === invitee.id)
    if (existingIndex >= 0) {
      passes[existingIndex] = invitee
    } else {
      passes.push(invitee)
    }

    // Write back to file
    await writeFile(PASS_FILE, JSON.stringify(passes, null, 2))

    return NextResponse.json({ success: true, invitee })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save invitee" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()

    // Read existing passes
    let passes = []
    try {
      const data = await readFile(PASS_FILE, "utf-8")
      passes = JSON.parse(data)
    } catch {
      passes = []
    }

    // Filter out the invitee
    passes = passes.filter((p: any) => p.id !== id)

    // Write back to file
    await writeFile(PASS_FILE, JSON.stringify(passes, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete invitee" }, { status: 500 })
  }
}
