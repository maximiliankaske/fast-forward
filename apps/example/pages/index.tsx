import type { NextPage } from "next";
import { ConnectButton } from "widget";

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen min-w-screen justify-center items-center">
      <ConnectButton
        projectId={"cl2dnfmpg00788jik7de0lhz2"}
        className="bg-indigo-500 rounded-full text-white px-3 py-2"
      >
        feedback
      </ConnectButton>
    </main>
  );
};

export default Home;
