import { Comment } from "@prisma/client";
import { fetcherGET } from "./ShowKichirs";
import useSWR from "swr";
import styles from "./ShowComments.module.css";
import dayjs, { Dayjs } from "dayjs";

export default function ShowComments({
  kichirId,
  randomInt,
}: {
  kichirId: number;
  randomInt: (min: number, max: number) => number;
}) {
  const { data, isLoading, error } = useSWR<
    (Comment & {
      author: {
        name: string | null;
        image: string | null;
        uname: string | null;
      };
    })[]
  >(`/api/getcomment?id=${kichirId}`, fetcherGET);

  // if (isLoading) <div> Loading </div>;
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || data.length === 0) return <div>No comments found</div>;
  console.log(data);

  return <div className={styles.main}>Show Comments</div>;
}
