// lib/userService.js
import prisma from "./prisma";

export async function createUser({
  email,
  password,
  name,
  status = "active",
}: {
  email: string;
  password: string;
  name: string;
  status: string;
}) {
  try {
    const newUser = await prisma.users.create({
      data: {
        email,
        password,
        name,
        status,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user.");
  }
}

// lib/userService.js
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Could not fetch user.");
  }
}

export async function getActivity() {
  try {
    const data = await prisma.activity.findMany({
      include: { user: true },
    });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log(error);
  }
}

export async function getAttacks() {
  try {
    const data = await prisma.attack.findMany();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log(error);
  }
}

export async function getAttackOverview(data) {
  try {
    // Fetch all attack data from the database

    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    // Example filters or aggregations based on your data criteria
    // Filter out SQL Injection attacks
    const sqlInjectionData = data.filter(
      (item) => item.attackType === "SQL Injection"
    );

    // Calculate the total number of attacks
    const totalAttacks = data.length;

    // Get count of unique IPs
    const uniqueIps = new Set(data.map((item) => item.ipAddress));
    const uniqueIpCount = uniqueIps.size;

    // Find the most common attack
    const attackCounts: Record<string, number> = {};
    data.forEach((item) => {
      if (attackCounts[item.attackType]) {
        attackCounts[item.attackType]++;
      } else {
        attackCounts[item.attackType] = 1;
      }
    });
    const mostCommonAttack = Object.entries(attackCounts).reduce((a, b) =>
      a[1] > b[1] ? a : b
    );

    // For SMS alerts, assume you have a separate function or logic to get SMS counts
    // You would replace this with actual SMS alert count

    // Return the filtered and aggregated data
    return [
      {
        title: "Total Attacks",
        value: totalAttacks.toLocaleString(),
        description: "+20.1% from last month", // Adjust description based on your logic
        icon: "💥",
      },
      {
        title: "Unique IPs",
        value: uniqueIpCount.toLocaleString(),
        description: "+180.1% from last month", // Adjust description based on your logic
        icon: "🌐",
      },

      {
        title: "Total SMS Alerts",
        value: totalAttacks.toLocaleString(),
        description: "+201 since last hour", // Adjust description based on your logic
        icon: "📱",
      },
    ];
  } catch (error) {
    console.error("Error fetching and processing attack data:", error);
    return [];
  }
}
