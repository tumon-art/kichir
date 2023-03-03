import { Session } from "next-auth";
import styles from "./AddInfo.module.css";
import Container from "./dls/Container";
import Spinner from "./dls/Spinner";
import useSWR from "swr";
import { FormEvent, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { fetcher } from "@/lib/swr/fetcher";
import useDebounce from "./hooks/useDebounce";

const isObjectEmpty = (objectName: any) => {
  return Object.keys(objectName).length === 0;
};

const addUnameToDB = () => {
  console.error("truesfdf");
};
// POST REQ
export default function AddInfo({ session }: { session: Session }) {
  const [user, setUser] = useState<User | null>();
  const [unameErr, setUnameErr] = useState<string>("");

  const DEBOUNCING_PERIOD_MS = 2000;
  const debouncedSearchQuery = useDebounce<any>(
    user?.uname,
    DEBOUNCING_PERIOD_MS
  );

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

  useEffect(() => {
    if (debouncedSearchQuery) {
      console.log(debouncedSearchQuery);
      const get = async () => {
        fetch("/api/checkuname", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uname: debouncedSearchQuery }),
        })
          .then((r) => r.json())
          .then((d) => {
            isObjectEmpty(d) == false
              ? setUnameErr("Try another username")
              : setUnameErr("");
          });
      };
      get();
    }
  }, [debouncedSearchQuery]);

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <Container px1em>
        <div style={{ height: "260px", width: "100%", position: "relative" }}>
          <Spinner />
        </div>
      </Container>
    );

  console.log("render");
  // const unameHadler = (e: FormEvent) => { setUser({...user, uname: "sdfsf"})};

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
            onChange={(e) => {
              if (user) setUser({ ...user, uname: e.target.value });
            }}
            value={user?.uname == null ? "" : user.uname}
            required
            placeholder="Enter your username"
          />
          <span> {unameErr} </span>
          <button style={{ opacity: unameErr ? "20%" : "100%" }} type="submit">
            Submit
          </button>
        </form>
      </div>
    </Container>
  );
}
