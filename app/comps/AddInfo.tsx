import styles from "./AddInfo.module.css";
import Container from "./dls/Container";

export default function AddInfo() {
  return (
    <Container px1em>
      <div className={styles.main}>
        <h2> Add some info </h2>
      </div>
    </Container>
  );
}
