"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import styles from "./page.module.css";
import { Button, message } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [buttonLoading, setButtonLoading] = useState(undefined);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (type) => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/getAllNews?type=${type}`);
      const entries = await response.json();
      console.log(entries);
      setIsLoading(false);
    } catch (err) {
      //(Needed: Notification error display)3
      console.log(err)
      messageApi.open({
        type: "error",
        content: "There was an error fetching. Please try again!",
      });

      setIsLoading(false);
    }
  };

  const handleButtonClick = async (index) => {
    
    setButtonLoading(index);
    const type = index === 0 ? "short-titles" : "long-titles";
    await fetchData(type);
    setButtonLoading(undefined);

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
          onClick={() => handleButtonClick(0)}
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
