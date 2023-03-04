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

// POST REQ
export default function AddInfo({ session }: { session: Session }) {
  const [user, setUser] = useState<User>();
  const [unameErr, setUnameErr] = useState<{ errText: string; ok: boolean }>({
    errText: "",
    ok: false,
  });

  // DEBOUNCING
  const DEBOUNCING_PERIOD_MS = 1000;
  const debouncedSearchQuery = useDebounce<any>(
    user?.uname,
    DEBOUNCING_PERIOD_MS
  );

  const { data, error, isLoading } = useSWR("/api/userinfo", () => {
    const res = fetcher("/api/userinfo", {
      email: session.user?.email,
    })
      .then((r) => setUser(r))
      .catch((err) => console.log(err));
  });

  // Handle @username
  useEffect(() => {
    const lowercaseWordPattern = /^[a-z]+$/;
    if (lowercaseWordPattern.test(debouncedSearchQuery)) {
      if (debouncedSearchQuery) {
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
                ? setUnameErr({ errText: "Try another username", ok: false })
                : setUnameErr({ errText: "", ok: true });
            });
        };
        get();
      }
    } else setUnameErr({ errText: "Enter a lowercase word", ok: false });
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

  // const unameHadler = (e: FormEvent) => { setUser({...user, uname: "sdfsf"})};

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container px1em>
      <div className={styles.main}>
        <h2> Add some info </h2>
        <form
          className={styles.customEmail}
          onSubmit={(e) => unameErr.ok && onFormSubmit(e)}
        >
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
          <span className={styles.spanErr}> {unameErr.errText} </span>
          <button
            className={`${
              unameErr.ok ? styles.btn_opacity_full : styles.btn_opacity_20
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
