"use client";
import Container from "./dls/Container";
import styles from "./ShowKichirs.module.css";
import useSWR from "swr";
import Spinner from "./dls/Spinner";
import { Kichir } from "@prisma/client";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { Comment, Love, View } from "./Icons";

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

  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: "now",
      m: "m",
      mm: "%dm",
      h: "h",
      hh: "%dh",
      d: "1d",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    },
  });

  // Generate Random number
  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return (
    <section>
      {data?.map((e) => {
        return (
          <Container key={e.id} px1em>
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
                <span className={styles.time}>
                  &#9202; {dayjs(e.createdAt).fromNow()}
                </span>
                <div className={styles.bodyText}>{e.body}</div>
                <div className={styles.cardFooter}>
                  <div className={styles.iconHold}>
                    <Love cssStyles={styles.loveIcon} />{" "}
                    <span> {randomInt(20, 70)}</span>
                  </div>

                  <div className={styles.iconHold}>
                    <Comment cssStyles={styles.loveIcon} />{" "}
                    <span> {randomInt(1, 10)} </span>
                  </div>
                  <div className={styles.iconHold}>
                    <View cssStyles={styles.ViewIcon} />
                    <span> {randomInt(50, 200)} </span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        );
      })}
    </section>
  );
}
