# Fast Forward

**An easy way to allow your users to give feedback**

> This project is in the experimental stage. If you have any questions, please contact: maximilian@kaske.org

## Demo

[fast-forward.vercel.app](https://fast-forward.vercel.app)

## Todo

- [ ] Check TODO: in Code and resolve it
- [ ] Move Thumbnail into Form Component (to better reset image on successful submit)
- [x] I18n (pass lang="de" to Widget Component of check `<html lang="de">`)
- [x] metadata - [feedback.fish example](https://feedback.fish/help/metadata)
- [ ] Replace Firebase with Supabase (Vercel Integration?)
- [ ] Slack Channel + Vercel Integration
- [ ] Create a `fast-forward-[widget]` npm package for easy integration
- [x] Write middleware on api to only access allowed resources (similar to firebase rules)
- [x] Create a Switch button to make the feedbacks open to everyone
- [ ] Remove unnecessary `packages` as _faker_, and move _@tailwind_ to `devDep`
- [ ] self-hosted documentation - [plausible.io example](https://plausible.io/docs/self-hosting)
- [x] Danger Zone - reset feedbacks!
- [x] Access `userAgent` and `location` from server site! No need to pass it with request
- [x] Checkout [next-auth](https://next-auth.js.org/getting-started/client#custom-client-session-handling) about how to create role based paths with params.
- [x] Replace feedback/Filter Component with Tabs (TailwindUI) to move from feedback.fish design
- [ ] Inside project accessibility -> add active/inactive status + show it on thumbnail
