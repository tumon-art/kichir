import { Categories, HashTags } from "@prisma/client";
import Card from "./dls/Card";
import HeaderH2 from "./dls/HeaderH2";
import { Ellipsis } from "./Icons";
import styles from "./Trends.module.css";

type SingleTag = HashTags & {
  categories: Categories[];
};

export interface HashTagType {
  hashTags: SingleTag[];
}

export default function Trends({ hashTags }: HashTagType) {
  return (
    <>
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
    </>
  );
}
