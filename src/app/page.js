"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import styles from "./page.module.css";
import { Button, message } from "antd";
import { FileSearchOutlined } from '@ant-design/icons';


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [buttonLoading, setButtonLoading] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("/api/getAllNews");
        const result = await response.json();
        console.log(result);

        setIsLoading(false);
      } catch (err) {
        //(Needed: Notification error display)
        messageApi.open({
          type: "error",
          content: "There was an error fetching. Please try again!",
        });

        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (index) => {
    setButtonLoading(index);
    setTimeout(() => {
      setButtonLoading(undefined);
    }, 6000);
  };

  return (
    <main className={styles.main}>
      {contextHolder}
      <div className={styles.description}>
        <p>
          <code className={styles.code}>News Scraper</code>
        </p>
      </div>

      <div className={styles.center}>
        {isLoading ? <LoadingSpinner /> : null}
      </div>

      <div className={styles.grid}>
        <Button
          type="primary"
          className={styles.buttons}
          icon={<FileSearchOutlined />}
          loading={buttonLoading === 0}
          onClick={()=> handleButtonClick(0)}
        >
          Short Title
        </Button>
        <Button
          className={styles.buttons}
          type="primary"
          icon={<FileSearchOutlined />}
          loading={buttonLoading === 1}
          onClick={() => handleButtonClick(1)}
        >
          Long Title
        </Button>
      </div>
    </main>
  );
}
