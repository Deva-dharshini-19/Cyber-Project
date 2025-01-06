"use client";

import { User2, LayoutDashboard, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter from next/navigation
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "@/app/_components/Logo";
import Link from "next/link";
import Cookie from "js-cookie"; // Import js-cookie

const items = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "User",
    icon: User2,
  },
];

function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter(); // Using useRouter from next/navigation

  const handleLogout = () => {
    // Remove the authentication token from the cookie
    Cookie.remove("authToken"); // Assuming the cookie name is "authToken"

    // Optionally, clear other cookies if necessary
    // Cookie.remove("otherCookie");

    // Redirect to the login page
    router.push("/login"); // Navigate to the login page
  };

  return (
    <Sidebar>
      <SidebarHeader className="mt-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const isActive = pathname === `/${item.title.toLowerCase()}`;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={`${item.title.toLowerCase()}`}
                        className={`flex items-center text-lg space-x-3 px-4 py-6 rounded-md transition duration-200 ${
                          isActive
                            ? "bg-gray-200"
                            : "hover:bg-gray-200 text-gray-800"
                        }`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-3">
        <button
          className="flex w-full items-center space-x-3 px-4 py-3 rounded-md hover:bg-gray-300 transition duration-200"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
