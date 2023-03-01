"use client";
import { Categories, HashTags } from "@prisma/client";
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
    <div className={styles.main}>
      <h2> Trends for world </h2>
      <div className={styles.tagsHold}>
        {hashTags?.map((hashTag: SingleTag, i) => {
          return (
            <div key={i}>
              <div> {hashTag.categories[0].name} </div>
              <div> {hashTag.tag} </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
