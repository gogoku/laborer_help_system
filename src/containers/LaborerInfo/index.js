import React, { useState } from "react";
import UserTable from "./UserTable";
import styles from "./styles.module.css";
import LaborerBrief from "./LaborerBrief";

export default function LaborerInfo() {
  const [laborer, selectLaborer] = useState({});
  return (
    <div className={styles.container}>
      <div className={styles.componentContainer}>
        <UserTable selectLaborer={selectLaborer} />
      </div>
      <div className={styles.componentContainer}>
        <LaborerBrief laborer={laborer} />
      </div>
    </div>
  );
}
