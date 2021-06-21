export type User = {
  uid: string;
  email: string | null;
  name: string | null;
  provider: string | undefined;
  photoUrl: string | null;
  token: string;
};

export type Site = {
  authorId: string;
  url: string;
};

export type WithId<T> = T & { id: string };
