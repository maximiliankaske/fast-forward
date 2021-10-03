// TODO: make it available through API

const translations: Record<
  "en" | "de" | "fr",
  {
    // title: string;
    type: {
      label: string;
      options: {
        issue: { label: string };
        idea: { label: string };
        other: { label: string };
      };
    };
    comment: { label: string; placeholder: string };
    submit: {
      label: string;
      state: {
        loading: string;
        success: string;
      };
    };
  }
> = {
  en: {
    // title: "What comes to your mind?"
    type: {
      label: "Type",
      options: {
        issue: {
          label: "Issue",
        },
        idea: { label: "Idea" },
        other: { label: "Other" },
      },
    },
    comment: { label: "Comment", placeholder: "Tell us about..." },
    submit: {
      label: "Submit",
      state: { loading: "loading", success: "Thanks for the feedback!" },
    },
  },
  de: {
    type: {
      label: "Typ",
      options: {
        issue: {
          label: "Problem",
        },
        idea: { label: "Idee" },
        other: { label: "Sonstiges" },
      },
    },
    comment: { label: "Kommentar", placeholder: "Es ist mir aufgefallen..." },
    submit: {
      label: "Senden",
      state: { loading: "lädt", success: "Danke für dein Feedback!" },
    },
  },
  fr: {
    type: {
      label: "Type",
      options: {
        issue: {
          label: "Problème",
        },
        idea: { label: "Idée" },
        other: { label: "Autres" },
      },
    },
    comment: { label: "Commentaire", placeholder: "J'ai remarqué..." },
    submit: {
      label: "Envoyer",
      state: { loading: "charge", success: "Merci pour ton Feedback!" },
    },
  },
};

export type LanguageCode = keyof typeof translations;

export function formattedMessages(lang: string) {
  if (Object.keys(translations).includes(lang)) {
    return translations[lang as LanguageCode];
  } else {
    console.log(`Language code not found: ${lang}`);
    return translations["en"];
  }
}

export default translations;
