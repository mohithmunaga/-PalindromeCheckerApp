import { prisma } from "./prisma";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";
import { format } from "date-fns";
import cron from "node-cron";

export async function runDailyBackup() {
  const now = new Date();
  const year = format(now, "yyyy");
  const month = format(now, "MM-MMMM");
  const day = format(now, "dd");
  const backupDir = path.join(process.cwd(), "backups", year, month, day);
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  const reports = [
    { type: "sales", filename: "Sales.xlsx" },
    { type: "inventory", filename: "Inventory.xlsx" },
    { type: "customers", filename: "Customers.xlsx" }
  ];
  try {
      for (const report of reports) {
        let data: any[] = [];
        if (report.type === "sales") {
          const sales = await prisma.invoice.findMany({ include: { customer: true } });
          data = sales.map((s: any) => ({ Invoice: s.invoiceNumber, Date: s.date.toLocaleDateString(), Customer: s.customer.name, Amount: s.totalAmount }));
        } else if (report.type === "inventory") {
          const inventory = await prisma.inventory.findMany({ include: { product: true, brand: true } });
          data = inventory.map((i: any) => ({ Product: i.product.name, Brand: i.brand.name, Quantity: i.quantity, Unit: i.unit }));
        } else if (report.type === "customers") {
          const customers = await prisma.customer.findMany();
          data = customers.map((c: any) => ({ Name: c.name, Mobile: c.mobile, Place: c.place }));
        }
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        XLSX.writeFile(workbook, path.join(backupDir, report.filename));
      }
      console.log(`[BACKUP] Daily Excel reports generated in ${backupDir}`);
  } catch (e) { console.error("[BACKUP] Failed:", e); }
}

// Schedule backup every day at midnight
cron.schedule("0 0 * * *", () => {
    runDailyBackup();
});
