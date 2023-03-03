import { Session } from "next-auth";
import styles from "./AddInfo.module.css";
import Container from "./dls/Container";
import Spinner from "./dls/Spinner";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { fetcher } from "@/lib/swr/fetcher";

// POST REQ

export default function AddInfo({ session }: { session: Session }) {
  const [user, setUser] = useState<User>();
  const [unameErr, setunameErr] = useState();

  const { data, error, isLoading } = useSWR("/api/userinfo", () =>
    fetcher("/api/userinfo", {
      email: session.user?.email,
    })
  );

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  console.log(user);
  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <Container px1em>
        <div style={{ height: "260px", width: "100%", position: "relative" }}>
          <Spinner />
        </div>
      </Container>
    );

  return (
    <Container px1em>
      <div className={styles.main}>
        <h2> Add some info </h2>
        <form className={styles.customEmail} onSubmit={() => null}>
          <input
            type="text"
            autoComplete="name"
            onChange={(e) => null}
            value={user?.name == null ? "" : user.name}
            required
            placeholder="Enter your name"
          />
          <input
            type="text"
            autoComplete="text"
            onChange={(e) => null}
            value={user?.uname == null ? "" : user.uname}
            required
            placeholder="Enter your username"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Container>
  );
}
