---
title: "Welcome to Fast Forward"
section: "Introduction"
excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus."
coverImage: "/assets/blog/preview/Watermelon_Two_Color.png"
date: "2020-10-10"
---

### Hey Folks 👋

It's been a while that I've been working in my free time on that project and there is no perfect timing to show off. So here I am, having no idea what I'm doing right now. 🤷‍♂️

### Inspiration 💡

So first of I want to thank all the open source maintainer and everyone who contributes to the community 👏. This project is heavily inspired by [React 2025](https://react2025.com/) made by [Lee Robinson](https://twitter.com/leeerob) and is using a lot of the same technologies. Luckily, in my professional day life, I am also confronted to the same libraries/frameworks so it was even more motivational to work around the tools. Also, I want to give props to [feedback.fish](https://feedback.fish) from the team around [Max Stoiber](https://twitter.com/mxstbr) as I copied some ideas from their tool. Check it out for production ready widgets.

### Fast Forward ⏩

The idea is pretty simple. Whenever I want to have a customizable _Feedback Widget_ I need an `API` endpoint to store my feedback without the pain of having to create that entire ecosystem around. I just want to register/login, create a project and use the `projectId` to send the feedbacks I collect from my new web app like:

```
{
  "projectId": "xyz",
  "type": "bug",
  "text": "In line 5, you are missing a semicolon. Otherwise great blog post!.
  "metadata": {
    "lang": "de"
  }
}
```

I also want to automatically retrieve informations about the

- _Timestamp_ 📅
- _Location_ 🗺
- _Device Metadata_ 📱

from the request so I don't have to worry about it.

And after checking the feedback, it would be good to archive them to keep track of what has been seen and revised or not. So therefore, we have an archive bucket to but old feedbacks in.

To **[show the demo](http://fast-forward.vercel.com/app/VWJU7eJdIEYGmoyKW4rp)**, you have the possibility to make your project _publically available_ so that you can share the project link and others have access to the feedback.

> Even though buttons like "archive" are visible, the functionality is prohibited by the `firebase.rules`.

Check out the little [Docs](https://fast-forward.vercel.app/docs) to which props are supported or see how I created the [Floating Widget](https://github.com/maximiliankaske/fast-forward/blob/main/components/widget/WidgetFABExample.tsx) on the current page.

### Tech Stack 📚

If you know the [React 2025](https://react2025.com/) tech stack, you might already know most of them. Here a the biggest ones I'm using:

- **next**: the hero
- **tailwindcss**: the beauty
- **headlessui**: the complementary
- **firebase(-admin)**: the hidden
- **md(x)**: the creator

But the easiest way for the moment would be to deep dive 🤿 into the [GitHub Repository](https://github.com/maximiliankaske/fast-forward).

Deployed on [Vercel](https://vercel.com) for perfect DX.

> Everything starts with an idea. And the foundation is set. Wish me luck 🍀 that it won't last as any side projects.
