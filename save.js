
generator client {
  provider = "prisma-client-js"
  output   = "./__generated__"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_URI")
}

model User {
  id String @id @default(uuid())

  email    String @unique
  password String

  isVarified        Boolean @default(false) @map("is_verified")
  isTwoFactorEnable Boolean @default(false) @map("upated_at")

  role UserRole @default(REGULAR)

  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @default(now()) @map("updated_at")

  method AuthMethod

  accounts Account[]

  @@map("users")
}

model Account {
  id String @id @default(uuid())

  type    String
  provide String

  refreshToken String? @map("refresh_token")
  accessToken  String? @map("access_token")
  expiresAt    Int     @map("exprires_at")

  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @default(now()) @map("updated_at")

  User   User?   @relation(fields: [userId], references: [id])
  userId String? @map("user_id")

  @@map("account")
}

model Token {
  id String @id @default(uuid())

  email     String
  token     String    @unique
  type      TokenType
  expiresIn DateTime  @map("expires_in")

  @@map("tokens")
}

enum UserRole {
  REGULAR
  ADMIN
}

enum AuthMethod {
  CREDENTIALS
  GOOGLE
  GITHUB
}

enum TokenType {
  VERIFICATION
  TWO_FACTOR
  PASSWORD_RESET
}
