import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Feature = defineDocumentType(() => ({
  name: "Feature",
  filePathPattern: `**/*.md`,
  fields: {
    title: {
      type: "string",
      description: "The title of the feature",
      required: true,
    },
    emoji: {
      type: "string",
      description: "The emoji of the feature",
      required: true,
    },
    excerpt: {
      type: "string",
      description: "The excerpt of the feature",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (feature) => `/features/${feature._raw.flattenedPath}`,
    },
    slug: {
      type: "string",
      resolve: (_) => _._raw.flattenedPath,
    },
  },
}));

export default makeSource({
  contentDirPath: "content/features",
  documentTypes: [Feature],
});
