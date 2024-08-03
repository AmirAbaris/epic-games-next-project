import Image from "next/image";
import GameList from "./components/GameList";

export default function Home() {
  return (
    <main className="container mx-auto">
      <>
        <GameList />
      </>
    </main>
  );
}
