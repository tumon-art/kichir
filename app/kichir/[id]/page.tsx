"use client";
import KichirComp from "@/app/comps/KichirComp";
import { AllKichris, fetcherGET } from "@/app/comps/ShowKichirs";
import Container from "@/app/comps/dls/Container";
import useSWR from "swr";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading, error } = useSWR<AllKichris>(
    `/api/getkichirs?id=${params.id}`,
    fetcherGET
  );

  if (isLoading) return <div> Loading </div>;
  return (
    <Container bX1px>
      <KichirComp kichir={data!} />
    </Container>
  );
}
