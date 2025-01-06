import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authenticateToken = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (e: unknown) {
    res.status(403).json({ error: "Invalid token" });
  }
};
