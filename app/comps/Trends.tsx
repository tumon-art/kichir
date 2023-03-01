import { Categories, HashTags } from "@prisma/client";
import Card from "./Card";
import Container from "./dls/Container";
import HeaderH2 from "./dls/HeaderH2";
import { Ellipsis } from "./Icons";
import styles from "./Trends.module.css";

type SingleTag = HashTags & {
  categories: Categories[];
};

export interface HashTagType {
  hashTags: SingleTag[] | undefined;
}

export default function Trends({ hashTags }: HashTagType) {
  console.log(hashTags);

  return (
    <Container>
      <HeaderH2> Trends for world </HeaderH2>
      <div className={styles.tagsHold}>
        {hashTags?.map((hashTag: SingleTag, i) => {
          return (
            <Card key={i}>
              <div className={styles.tagContainer}>
                <div className={styles.tagHold} key={i}>
                  <div className={styles.categor}>
                    {hashTag.categories[0].name}
                  </div>
                  <div className={styles.hashTag}> #{hashTag.tag} </div>
                  <div className={styles.categor}>
                    {i == 0 ? 8 : 2 * i}2K Kichirs{" "}
                  </div>
                </div>
                <Ellipsis />
              </div>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}
