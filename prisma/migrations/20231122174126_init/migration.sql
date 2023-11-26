-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);
