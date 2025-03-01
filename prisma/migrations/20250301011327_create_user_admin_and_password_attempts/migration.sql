-- CreateTable
CREATE TABLE "tb_user_admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_user_admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user_admin_password_attempts" (
    "id" SERIAL NOT NULL,
    "user_admin_id" INTEGER NOT NULL,
    "attempts_count" INTEGER NOT NULL,
    "last_attempt_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_user_admin_password_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_admin_email_key" ON "tb_user_admin"("email");

-- AddForeignKey
ALTER TABLE "tb_user_admin_password_attempts" ADD CONSTRAINT "tb_user_admin_password_attempts_user_admin_id_fkey" FOREIGN KEY ("user_admin_id") REFERENCES "tb_user_admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
