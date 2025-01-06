import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../_lib/prisma";
import twilio from "twilio";

const JWT_SECRET = process.env.JWT_SECRET!;
const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID!;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!;

// Create Twilio client
const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

// Function to check for SQL injection patterns in the username
const containsSQLInjectionPatterns = (str: string) => {
  const sqlInjectionPattern = /(\b(OR|SELECT|INSERT|DROP|--|;|')\b)/i;
  return sqlInjectionPattern.test(str);
};

export async function POST(req: Request) {
  try {
    const { userName, password } = await req.json();

    if (!userName || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for potential SQL injection in the username
    if (containsSQLInjectionPatterns(userName)) {
      // Send SMS alert to the admin for SQL injection detection
      await client.messages.create({
        body: `Possible SQL injection attempt detected with username: ${userName}`,
        from: "+12184754172", 
        to: "+919345577429", 
      });

      // Log the SQL injection attack in the 'attacks' table
      await prisma.attack.create({
        data: {
          attackType: "SQL Injection",
          ipAddress: req.headers.get("x-forwarded-for") || "unknown",
          timestamp: new Date(),
        },
      });

      return NextResponse.json(
        { error: "Potential SQL injection attempt detected" },
        { status: 400 }
      );
    }

    // Normal login flow if no attack detected
    const userExists = await prisma.user.findUnique({
      where: { userName },
    });

    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate a JWT
    const token = jwt.sign(
      { userId: userExists.id, userName: userExists.userName },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Log the login activity in the 'activity' table
    const ipAddress = req.headers.get("x-forwarded-for") || "unknown";
    await prisma.activity.create({
      data: {
        loginTime: new Date(),
        ipAddress,
        type: "login",
        userName: userName,
      },
    });

    // Create the response and set cookies
    const userData = JSON.stringify(userExists);
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("token", token, {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Protect against CSRF attacks
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });
    response.cookies.set("userData", userData, {
      httpOnly: false, // Allow access via JavaScript for client-side usage
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Protect against CSRF attacks
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error.message, error.stack);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
