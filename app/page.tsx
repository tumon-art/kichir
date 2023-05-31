import PostKichir from "./comps/PostKichir";
import Container from "./comps/dls/Container";
import ShowKichirs from "./comps/ShowKichirs";

export default async function Home() {
  return (
    <main className="mainRow">
      <Container bX1px>
        <PostKichir />
        <ShowKichirs />
      </Container>
    </main>
  );
}
