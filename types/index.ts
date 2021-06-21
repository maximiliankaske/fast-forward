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

export type Post = {
  title: string;
  date: string;
  slug: string;
  coverImage: string;
  // FIXME: author as object and corresponding generics in ../lib/api (Record<T, string>)
  authorName: string;
  authorPicture: string;
  content: string;
  ogImageUrl: string;
};

export type WithId<T> = T & { id: string };
