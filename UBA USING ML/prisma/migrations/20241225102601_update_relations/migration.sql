-- CreateTable
CREATE TABLE "Attack" (
    "id" SERIAL NOT NULL,
    "attackType" VARCHAR(50) NOT NULL,
    "ipAddress" VARCHAR(15),
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attack_pkey" PRIMARY KEY ("id")
);
