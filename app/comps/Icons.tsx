import styles from "./Icons.module.css";

export function Logo() {
  return (
    <svg
      width="40"
      height="40"
      version="1.1"
      viewBox="0 0 512 512"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#2ec27e"
          d="M247.516,434.74c-53.811,0-110.765-14.719-154.048-40.044 c-43.911-25.694-72.524-48.875-88.795-63.797c-5.868-5.383-6.264-14.504-0.881-20.372c5.378-5.867,14.502-6.265,20.372-0.881 c15.236,13.972,42.155,35.751,83.868,60.161c73.213,42.838,216.55,63.166,291.692-29.254c14.51-17.842,20.136-32.344,26.092-47.699 c7.919-20.414,16.745-43.171,46.085-74.24c-3.75-2.523-6.958-5.626-8.909-9.421c-1.184-2.306-2.474-4.911-3.88-7.756 c-16.481-33.319-47.155-95.339-118.264-95.339c-38.285,0-71.256,24.6-97.997,73.113c-3.844,6.974-12.619,9.511-19.588,5.668 c-6.974-3.844-9.512-12.615-5.668-19.588c32.197-58.413,73.666-88.031,123.252-88.031c38.598,0,72.144,14.588,99.713,43.356 c22.215,23.184,35.565,50.175,44.4,68.035c1.083,2.189,2.091,4.229,3.034,6.089c2.392,1.556,8.594,3.736,12.766,4.68 c5.215,1.179,9.349,5.148,10.742,10.309c1.393,5.162-0.187,10.671-4.104,14.314c-37.477,34.849-45.842,56.412-54.699,79.24 c-6.501,16.762-13.226,34.095-30.602,55.463c-48.747,59.955-116.948,74.343-165.58,75.856 C253.533,434.694,250.527,434.74,247.516,434.74z"
        ></path>
        <path
          fill="#08b74f"
          d="M95.656,293.209c37.748,28.148,87.779,31.968,126.659,29.283 c35.811-2.473,60.944-36.177,53.097-71.204c-8.52-38.031-26.453-84.892-64.201-113.04C139.586,84.838,23.745,119.02,23.745,119.02 S24.032,239.799,95.656,293.209z"
        ></path>
        <g>
          <path
            fill="#2ec27e"
            d="M201.921,337.629c-0.003,0-0.006,0-0.009,0c-46.987,0-85.636-11.056-114.875-32.86 C10.51,247.702,9.338,124.282,9.326,119.055c-0.016-6.403,4.194-12.051,10.337-13.864c1.573-0.464,39.033-11.363,85.29-11.363 c46.985,0,85.636,11.056,114.876,32.862c42.12,31.408,61.126,83.38,69.653,121.448c4.66,20.802,0.036,42.518-12.687,59.581 s-32.219,27.691-53.487,29.159C216.082,337.377,208.887,337.629,201.921,337.629z M38.697,130.157 c2.138,29.902,12.788,112.128,65.578,151.494c24.15,18.009,57,27.141,97.637,27.141c0.001,0,0.004,0,0.006,0 c6.307,0,12.834-0.229,19.405-0.683c12.87-0.89,24.662-7.315,32.353-17.63c7.691-10.314,10.485-23.451,7.665-36.038 c-7.463-33.312-23.712-78.505-58.751-104.633c-24.151-18.011-57.002-27.142-97.638-27.142 C77.043,122.665,52.249,127.138,38.697,130.157z"
          ></path>
          <path
            fill="#2ec27e"
            d="M384.98,217.022h-11.535c-7.962,0-14.419-6.455-14.419-14.419s6.457-14.419,14.419-14.419h11.535 c7.962,0,14.419,6.455,14.419,14.419S392.943,217.022,384.98,217.022z"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export function GoogleLogo({ cssStyles }: { cssStyles?: string }) {
  return (
    <svg
      className={cssStyles}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M19.76 10.77L19.67 10.42H12.23V13.58H16.68C16.4317 14.5443 15.8672 15.3974 15.0767 16.0029C14.2863 16.6084 13.3156 16.9313 12.32 16.92C11.0208 16.9093 9.77254 16.4135 8.81999 15.53C8.35174 15.0685 7.97912 14.5191 7.72344 13.9134C7.46777 13.3077 7.33407 12.6575 7.33 12C7.34511 10.6795 7.86792 9.41544 8.79 8.47002C9.7291 7.58038 10.9764 7.08932 12.27 7.10002C13.3779 7.10855 14.4446 7.52101 15.27 8.26002L17.47 6.00002C16.02 4.70638 14.1432 3.9941 12.2 4.00002C11.131 3.99367 10.0713 4.19793 9.08127 4.60115C8.09125 5.00436 7.19034 5.59863 6.43 6.35002C4.98369 7.8523 4.16827 9.85182 4.15152 11.9371C4.13478 14.0224 4.918 16.0347 6.34 17.56C7.12784 18.3449 8.06422 18.965 9.09441 19.3839C10.1246 19.8029 11.2279 20.0123 12.34 20C13.3484 20.0075 14.3479 19.8102 15.2779 19.42C16.2078 19.0298 17.0488 18.4549 17.75 17.73C19.1259 16.2171 19.8702 14.2347 19.83 12.19C19.8408 11.7156 19.8174 11.2411 19.76 10.77Z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );
}

export function Ellipsis() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={styles.ellipsis}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  );
}

export function Feather({ cssStyles }: { cssStyles?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={cssStyles}>
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <polygon
          className={styles.feather_1}
          points="224.492,288.821 224.492,485.744 287.508,512 287.508,288.821 "
        ></polygon>{" "}
        <path
          className={styles.feather_2}
          d="M256,0c-32.851,0-59.301,20.874-72.822,48.69c-6.786,13.961-14.335,52.017-21.294,95.72 c-0.017,0.021,41.603,52.513,41.603,52.513s-47.59-12.698-47.598-12.681c-10.254,71.751-18.043,143.963-18.043,143.963L256,433.231 C256,433.231,256,82.708,256,0z"
        ></path>{" "}
        <path
          className={styles.feather_3}
          d="M256,0c32.851,0,59.301,20.874,72.822,48.69c6.786,13.961,14.335,52.017,21.294,95.72 c0.017,0.021-41.603,52.513-41.603,52.513s47.59-12.698,47.598-12.681c10.253,71.751,18.043,143.963,18.043,143.963L256,433.231 C256,433.231,256,82.708,256,0z"
        ></path>{" "}
      </g>
    </svg>
  );
}

export function Emoji({ cssStyles }: { cssStyles?: string }) {
  return (
    <svg className={cssStyles} viewBox="0 0 24.00 24.00" fill="none">
      <title> :emoji </title>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          opacity="0.1"
          d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          className={styles.EmojiPaths}
        ></path>
        <path
          d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          className={styles.EmojiPaths}
          strokeWidth="2"
        ></path>
        <path
          d="M8 14C8.91221 15.2144 10.3645 16 12.0004 16C13.6362 16 15.0885 15.2144 16.0007 14"
          className={styles.EmojiPaths}
          strokeWidth="2"
          strokeLinecap="round"
        ></path>
        <path
          d="M9 10.0112V10"
          className={styles.EmojiPaths}
          strokeWidth="2"
          strokeLinecap="round"
        ></path>
        <path
          d="M15 10.0112V10"
          className={styles.EmojiPaths}
          strokeWidth="2"
          strokeLinecap="round"
        ></path>
      </g>
    </svg>
  );
}

export function Globe({ cssStyles }: { cssStyles?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cssStyles}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
      />
    </svg>
  );
}

export function Love({ cssStyles }: { cssStyles?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cssStyles}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

export function CommentIcon({ cssStyles }: { cssStyles?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cssStyles}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
      />
    </svg>
  );
}

export function View({ cssStyles }: { cssStyles?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cssStyles}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

export function Photo({ cssStyles }: { cssStyles?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cssStyles}>
      <title> Image </title>
      <g>
        <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
      </g>
    </svg>
  );
}

export function XMark({ cssStyles }: { cssStyles?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className={cssStyles}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export function Home({ cssStyles }: { cssStyles?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className={cssStyles}>
      <title>Home</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
}

export function Profile({ cssStyles }: { cssStyles?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className={cssStyles}>
      <title>Profile</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

export function Followers({ cssStyles }: { cssStyles?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className={cssStyles}>
      <title>Followers</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  );
}

export function Bookmarks({ cssStyles }: { cssStyles?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className={cssStyles}>
      <title>Bookmarks</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
}

export function HashTag({ cssStyles }: { cssStyles?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className={cssStyles}>
      <title>Bookmarks</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
      />
    </svg>
  );
}

export function Notification({ cssStyles }: { cssStyles?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className={cssStyles}>
      <title> Notification </title>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
      />
    </svg>
  );
}

export function Telegram({ cssStyles }: { cssStyles?: string }) {
  return (
    <svg fill="none" viewBox="0 0 256 256" className={cssStyles}>
      <title> Telegram </title>
      <path d="M228.646,34.7676a11.96514,11.96514,0,0,0-12.21778-2.0752L31.87109,105.19729a11.99915,11.99915,0,0,0,2.03467,22.93457L84,138.15139v61.833a11.8137,11.8137,0,0,0,7.40771,11.08593,12.17148,12.17148,0,0,0,4.66846.94434,11.83219,11.83219,0,0,0,8.40918-3.5459l28.59619-28.59619L175.2749,217.003a11.89844,11.89844,0,0,0,7.88819,3.00195,12.112,12.112,0,0,0,3.72265-.59082,11.89762,11.89762,0,0,0,8.01319-8.73925L232.5127,46.542A11.97177,11.97177,0,0,0,228.646,34.7676ZM32.2749,116.71877a3.86572,3.86572,0,0,1,2.522-4.07617L203.97217,46.18044,87.07227,130.60769,35.47461,120.28811A3.86618,3.86618,0,0,1,32.2749,116.71877Zm66.55322,86.09375A3.99976,3.99976,0,0,1,92,199.9844V143.72048l35.064,30.85669ZM224.71484,44.7549,187.10107,208.88772a4.0003,4.0003,0,0,1-6.5415,2.10937l-86.1543-75.8164,129.66309-93.645A3.80732,3.80732,0,0,1,224.71484,44.7549Z"></path>
    </svg>
  );
}
