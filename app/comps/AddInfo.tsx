import { Session } from "next-auth";
import styles from "./AddInfo.module.css";
import Container from "./dls/Container";
import Spinner from "./dls/Spinner";
import useSWR from "swr";
import { FormEvent, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { fetcherPOST } from "@/lib/swr/fetcherPOST";
import useDebounce from "./hooks/useDebounce";
import { isObjectEmpty } from "@/lib/tools/isObjectEmpty";
import { redirect } from "next/navigation";

// POST REQ
export default function AddInfo({ session }: { session: Session }) {
  const [user, setUser] = useState<User>();
  const [link, setLink] = useState<string>();
  const [unameErr, setUnameErr] = useState<{
    errText: string;
    ok: boolean;
    okUname?: string;
  }>({
    errText: "",
    ok: false,
  });

  const { data, error, isLoading } = useSWR("/api/userinfo", () =>
    fetcherPOST("/api/userinfo", {
      email: session.user?.email,
    })
      .then((r: User) => {
        if (r.name && r.uname) setLink("/");
        setUser(r);
      })
      .catch((err) => console.log(err))
  );

  if (link) redirect(link);

  // DEBOUNCING
  const DEBOUNCING_PERIOD_MS = 1000;
  const debouncedSearchQuery = useDebounce<any>(
    user?.uname,
    DEBOUNCING_PERIOD_MS
  );

  // Handle @username
  useEffect(() => {
    console.log("useEffect");
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
                : setUnameErr({
                    errText: "available!",
                    ok: true,
                    okUname: debouncedSearchQuery,
                  });
            });
        };
        get();
      }
    } else {
      setUnameErr({ errText: "Enter a lowercase word", ok: false });
    }
  }, [debouncedSearchQuery]);

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <Container px1em mt3em>
        <div className={styles.loadingDiv}>
          <Spinner />
        </div>
      </Container>
    );

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    unameErr.okUname?.length !== null &&
      fetch("/api/userinfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          name: user?.name,
          uname: unameErr.okUname,
        }),
      })
        .then((r) => r.json())
        .then((d) => setLink("/"))
        .catch((err) => console.log(err));
  };

  console.log("render Add Info");
  return (
    <Container px1em mt3em>
      <div className={styles.main}>
        <h2> Add some info </h2>
        <form
          className={styles.customEmail}
          onSubmit={(e) => {
            e.preventDefault();
            unameErr.ok && onFormSubmit(e);
          }}
        >
          <fieldset>
            <legend> Full Name </legend>
            <input
              className={styles.name}
              type="text"
              autoComplete="name"
              onChange={(e) => {
                if (user) setUser({ ...user, name: e.target.value });
              }}
              value={user?.name == null ? "" : user.name}
              required
              placeholder="Enter your name"
            />
          </fieldset>

          <fieldset>
            <legend> User Name </legend>
            <input
              type="text"
              autoComplete="text"
              className={styles.inputUname}
              onChange={(e) => {
                if (user) setUser({ ...user, uname: e.target.value });
              }}
              value={user?.uname == null ? "" : user.uname}
              required
              pattern="[a-z]+"
              placeholder="Create @username"
              onInvalid={(e) => {
                setUnameErr({ errText: "Enter a lowercase word", ok: false });
                (e.target as HTMLInputElement).setCustomValidity(
                  "Enter a lowercase word"
                );
              }}
            />
          </fieldset>

          <span className={unameErr.ok ? styles.spanNoErr : styles.spanErr}>
            {user?.uname == null ? "" : unameErr.errText}
          </span>

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
