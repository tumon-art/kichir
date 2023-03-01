import Container from "./dls/Container";
import TextLinkSpan from "./dls/TextLinkSpan";
import styles from "./Footer.module.css";

const textarr = [
  "Terms of Service",
  "Privacy Policy",
  "Cookie Policy",
  "Accessibility",
  "Ads info",
  "More...",
];
export default function Footer() {
  return (
    <Container px1em>
      <div className={styles.main}>
        <div className={styles.textHold}>
          {textarr.map((e: string, i) => (
            <span key={i} className={styles.span}>
              <TextLinkSpan textDark> {e} </TextLinkSpan>
            </span>
          ))}
        </div>
        <span className={styles.span2}> © 2023 Kichir, Inc. </span>
      </div>
    </Container>
  );
}
