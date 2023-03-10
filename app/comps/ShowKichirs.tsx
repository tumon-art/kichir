"use client";
import Container from "./dls/Container";
import styles from "./ShowKichirs.module.css";
import useSWR from "swr";
import Spinner from "./dls/Spinner";
import { Kichir } from "@prisma/client";
import Image from "next/image";

const fetcherGET = (url: string) => fetch(url).then((r) => r.json());

interface AllKichris extends Kichir {
  author: {
    name: string;
    image: string;
    uname: string;
  };
}

export default function ShowKichirs() {
  const { data, error, isLoading } = useSWR<AllKichris[]>(
    "/api/getkichirs",
    fetcherGET
  );

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
    <section>
      {data?.map((e, i) => {
        return (
          <Container key={i} px1em>
            <div className={styles.card}>
              <div className={styles.imgHold}>
                <Image
                  src={e.author.image}
                  alt="author"
                  height={30}
                  width={30}
                  className={styles.authorImg}
                />
              </div>
              <div>
                <span className={styles.name}> {e.author.name} </span>
                <span className={styles.uname}> @{e.author.uname} </span>
                <div className={styles.bodyText}>{e.body}</div>
              </div>
            </div>
          </Container>
        );
      })}
    </section>
  );
}
