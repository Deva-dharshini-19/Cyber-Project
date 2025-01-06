-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "loginTime" TIMESTAMP(6) NOT NULL,
    "LogoutTime" TIMESTAMP(6),
    "ipAddress" VARCHAR(15),
    "type" VARCHAR(50) NOT NULL,
    "column_6" TEXT,
    "column_7" TEXT,
    "column_8" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" TEXT,
    "column_6" TEXT,
    "column_7" TEXT,
    "column_8" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
