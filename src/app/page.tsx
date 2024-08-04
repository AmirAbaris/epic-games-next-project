import GameList from "./components/GameList";

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="flex flex-col">
        <GameList listTitle="New Releases" hasLink={true} />
      </div>
    </main>
  );
}
