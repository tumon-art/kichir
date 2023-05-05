import PostKichir from "./comps/PostKichir";
import Container from "./comps/dls/Container";
import ShowKichirs from "./comps/ShowKichirs";

export default async function Home() {
  return (
    <>
      <Container bX1px>
        <PostKichir />
        <ShowKichirs />
      </Container>
    </>
  );
}
