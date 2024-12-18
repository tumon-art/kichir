"use client";;
import { use } from "react";
import KichirComp from "@/app/comps/KichirComp";
import { AllKichris, fetcherGET } from "@/app/comps/ShowKichirs";
import Container from "@/app/comps/dls/Container";
import Spinner from "@/app/comps/dls/Spinner";
import useSWR from "swr";

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { data, isLoading, error } = useSWR<AllKichris>(
    `/api/getkichirs?id=${params.id}`,
    fetcherGET
  );

  if (isLoading)
    return (
      <Container px1em mt3em>
        <div className="loadingDiv">
          <Spinner />
        </div>
      </Container>
    );
  return (
    <Container bX1px>
      <KichirComp kichir={data!} />
    </Container>
  );
}
