"use client";
import Container from "./dls/Container";
import styles from "./ShowKichirs.module.css";
import useSWR from "swr";
import Spinner from "./dls/Spinner";

const fetcherGET = (url: string) => fetch(url).then((r) => r.json());

export default function ShowKichirs() {
  const { data, error, isLoading } = useSWR("/api/userinfo", fetcherGET);

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <Container px1em mt3em>
        <div className={styles.loadingDiv}>
          <Spinner />
        </div>
      </Container>
    );

  return (
    <Container>
      <div> Show Kichirs </div>
    </Container>
  );
}
