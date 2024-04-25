export default async function Home() {
  const users = await fetch("http://localhost:4000/users");
  return (
    <main>
      <h1>niemals</h1>
    </main>
  );
}
