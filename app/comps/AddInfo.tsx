import { Session } from "next-auth";
import styles from "./AddInfo.module.css";
import Container from "./dls/Container";
import Spinner from "./dls/Spinner";
import useSWR from "swr";
import { FormEvent, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { fetcher } from "@/lib/swr/fetcher";
import useDebounce from "./hooks/useDebounce";
import { isObjectEmpty } from "@/lib/tools/isObjectEmpty";

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
    const lowercaseWordPattern = /^[a-z]+$/;
    if (lowercaseWordPattern.test(debouncedSearchQuery)) {
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

    } else setUnameErr("Enter a lowercase word")

  }, [debouncedSearchQuery]);

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <Container px1em>
        <div className={styles.loadingDiv}>
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
            className={styles.name}
            type="text"
            autoComplete="name"
            onChange={(e) => null}
            value={user?.name == null ? "" : user.name}
            required
            placeholder="Enter your name"
          />
          <span> @username </span>
          <input
            type="text"
            autoComplete="text"
            className={styles.inputUname}
            onChange={(e) => {

              if (user) setUser({ ...user, uname: e.target.value });
            }}
            value={user?.uname == null ? "" : user.uname}
            required
            placeholder="Create @username"
          />
          <span> {unameErr} </span>
          <button
            className={`${unameErr ? styles.btn_opacity_20 : styles.btn_opacity_full
              }`}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </Container>
  );
}
