import { Badge, Button, Heading, Text } from "@fast-forward/ui";
import React from "react";
import dynamic from "next/dynamic";

// dynamic only works with "export default" Components
const DynamicPortalWithNoSSR = dynamic(() => import("@fdbk/widget-react"), {
  ssr: false,
});

const Playground = () => {
  const [index, setIndex] = React.useState(0);
  const [open, setOpen] = React.useState(true);
  const toggle = () => setOpen((prev) => !prev);
  return (
    <>
      <main className="flex flex-col min-h-screen min-w-screen justify-center items-center">
        <div className="space-y-4 p-3 max-w-xl">
          <Heading className="text-center">Playground</Heading>
          <div className="space-x-4 bg-red-500/90">
            <Badge color="primary">Playground</Badge>
            <Button onClick={toggle} variant="primary">
              {open ? "deactivate" : "activate"}
            </Button>
            <Button onClick={() => setIndex((prev) => prev + 1)} variant="none">
              {index}
            </Button>
          </div>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            semper mollis est non dignissim. Cras sed ultricies nulla.
            Pellentesque a posuere augue, nec pellentesque ligula. Pellentesque
            mattis interdum varius. Pellentesque dictum, erat id faucibus
            blandit, ipsum orci tincidunt ex, at sagittis mauris urna sit amet
            nunc. Maecenas convallis dictum pretium. Nullam accumsan mi velit,
            et malesuada magna cursus eget. Pellentesque fermentum, urna a
            faucibus ullamcorper, odio lacus suscipit orci, et porta dui enim
            quis nibh. Donec sagittis arcu lacus, eget egestas tellus dapibus
            ac. Etiam tempus a leo sed egestas. Duis quis massa diam.
            Pellentesque rutrum velit ac orci maximus porta. Maecenas iaculis
            luctus bibendum. Phasellus quis luctus dolor.
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            semper mollis est non dignissim. Cras sed ultricies nulla.
            Pellentesque a posuere augue, nec pellentesque ligula. Pellentesque
            mattis interdum varius. Pellentesque dictum, erat id faucibus
            blandit, ipsum orci tincidunt ex, at sagittis mauris urna sit amet
            nunc. Maecenas convallis dictum pretium. Nullam accumsan mi velit,
            et malesuada magna cursus eget. Pellentesque fermentum, urna a
            faucibus ullamcorper, odio lacus suscipit orci, et porta dui enim
            quis nibh. Donec sagittis arcu lacus, eget egestas tellus dapibus
            ac. Etiam tempus a leo sed egestas. Duis quis massa diam.
            Pellentesque rutrum velit ac orci maximus porta. Maecenas iaculis
            luctus bibendum. Phasellus quis luctus dolor.
          </Text>
        </div>
      </main>
      <DynamicPortalWithNoSSR {...{ open, toggle }} />
    </>
  );
};

export default Playground;
