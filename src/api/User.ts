import { Prisma, User } from "@prisma/client";
export async function fetchUsers(): Promise<User[]> {
  return await window.Main.db.users.getUsers();
}

export async function postUser(t:Prisma.UserCreateInput): Promise<User> {
  return await window.Main.db.users.createUser(t);
}