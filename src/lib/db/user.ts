import type { User } from "@/types/index";
import { create, update } from "./utils";

export function updateUser(uid: string, data: Omit<User, "token">) {
  return update({
    ref: "users",
    id: uid,
    data,
  });
}

export function createUser(uid: string, data: Omit<User, "token">) {
  return create({
    ref: "users",
    id: uid,
    data,
  });
}
