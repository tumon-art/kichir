import { use } from "react";

export default function Page(props: { params: Promise<{ uname: string }> }) {
  const params = use(props.params);

  return <div> {params.uname} </div>
}
