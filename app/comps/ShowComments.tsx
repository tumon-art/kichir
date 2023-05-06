import { Comment } from "@prisma/client";
import { fetcherGET } from "./ShowKichirs";
import useSWR from "swr";

export default function ShowComments({ kichirId }: { kichirId: number }) {
  const { data, isLoading, error } = useSWR<Comment>(
    `/api/getcomment?id=${kichirId}`,
    fetcherGET
  );

  if (isLoading) <div> Loading </div>;
  console.log(data);
  return <div>Show Comments</div>;
}
