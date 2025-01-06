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

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  status: string;
  role: string;
  column_7: string | null;
  column_8: string | null;
}

interface Activity {
  id: number;
  loginTime: string; // Use Date if the object will be parsed into a Date instance
  logoutTime: string | null; // Use Date | null if you'll handle dates
  ipAddress: string;
  type: string;
  column_6: string | null;
  column_7: string | null;
  column_8: string | null;
  userId: number;
  user: User;
}

export function TableUi({ data }: { data: Activity[] }) {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table className="bg-white/70">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>id</TableHead>
              <TableHead className="py-4 ms-2">Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Login Time</TableHead>
              <TableHead>Login IP</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d.id}>
                <TableCell></TableCell>
                <TableCell>{d.id}</TableCell>
                <TableCell>{d.user.email}</TableCell>
                <TableCell>{d.user.name}</TableCell>
                <TableCell>
                  {new Date(d.loginTime).toLocaleString()}
                </TableCell>
                <TableCell>{d.ipAddress}</TableCell>
                <TableCell>{d.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
