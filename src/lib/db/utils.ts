import converter from "@/utils/converter";
import firebase from "../firebase";

/** GET IS ALWAYS REQUESTED THROUGH API ROUTES */
type Get = {
  ref: string;
  id: string;
};

export async function get<T>({ ref, id }: Get) {
  try {
    const doc = await firebase.firestore().collection(ref).doc(id).get();
    return {
      doc: doc.data() as T,
      exists: doc.exists,
    };
  } catch (error) {
    return { error };
  }
}
/** */

type Create<T> = {
  ref: string;
  id?: string;
  data: T;
};

export async function create<T>({ ref, data, id }: Create<T>) {
  try {
    if (id) {
      const doc = await firebase
        .firestore()
        .collection(ref)
        .withConverter(converter<T>())
        .doc(id)
        .set(data);
      return { doc };
    } else {
      const doc = await firebase
        .firestore()
        .collection(ref)
        .withConverter(converter<T>())
        .add(data);
      return { doc };
    }
  } catch (error) {
    return { error };
  }
}

type Update<T> = {
  ref: string;
  id: string;
  data: Partial<T>;
};

export async function update<T>({ ref, id, data }: Update<T>) {
  try {
    await firebase.firestore().collection(ref).doc(id).update(data);
    return true;
  } catch (error) {
    return { error };
  }
}

type Delete = {
  ref: string;
  id: string;
};

export async function _delete({ ref, id }: Delete) {
  try {
    await firebase.firestore().collection(ref).doc(id).delete();
    return true;
  } catch (error) {
    return { error };
  }
}
