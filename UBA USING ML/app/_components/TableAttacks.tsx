"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Attack {
  id: number;
  attackType: string;
  ipAddress: string | null;
  timestamp: string; // You can use Date if you want to handle it as a Date object
}

export function TableAttack({ data }: { data: Attack[] }) {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table className="bg-white/70">
          <TableHeader>
            <TableRow>
            <TableHead></TableHead>
              <TableHead>id</TableHead>
              <TableHead className="py-4 ms-2">Attack Type</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d.id}>
                <TableHead></TableHead>
                <TableCell>{d.id}</TableCell>
                <TableCell>{d.attackType}</TableCell>
                <TableCell>{d.ipAddress ?? "N/A"}</TableCell>
                <TableCell>{new Date(d.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
