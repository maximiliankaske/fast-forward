import { db } from "../firebase-admin";
import * as admin from "firebase-admin";
import converter from "@/utils/converter";

type Get = {
  ref: string;
  id: string;
};

export async function get<T>({ ref, id }: Get) {
  try {
    const doc = await db.collection(ref).doc(id).get();
    return {
      id,
      doc: doc.data() as T,
      exists: doc.exists,
    };
  } catch (error) {
    return { error };
  }
}
