import { NextResponse } from "next/server";
import { runDailyBackup } from "@/lib/cron";

export async function POST() {
    try {
        await runDailyBackup();
        return NextResponse.json({ success: true, message: "Backup completed successfully" });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
