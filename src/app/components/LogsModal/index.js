import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import axios from "axios";

import { Modal, List, Progress, Button, Empty } from "antd";
import "./logsModal.css";

function LogsModal({ state, setOpenLogs }) {
  const [userLogs, setUserLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state) {
      fetchLogs();
    }
  }, [state]);

  const fetchLogs = async () => {
    try {
      console.log("start fetching logs");
      setLoading(true);

      const response = await fetch(`/api/getAllLogs`);
      const entries = await response.json();

      console.log(entries.logs);
      setUserLogs(entries.logs);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const deleteLogs = async () => {
    try {
      setLoading(true);
      console.log(JSON.stringify({ userLogs: userLogs }));

      await fetch("/api/deleteAllLogs");

      fetchLogs();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="User interaction logs"
        centered
        open={state}
        onOk={() => setOpenLogs(false)}
        onCancel={() => setOpenLogs(false)}
        style={{ maxHeight: "500px", overflowY: "auto" }}
        footer={[
          <div className="modal-buttons-container">
            <div className="modal-buttons">
              {userLogs?.length ? (
                <>
                  <Progress percent={userLogs.length} key="%" />
                  <Button key="back" onClick={() => deleteLogs()}>
                    Clean
                  </Button>
                </>
              ) : null}

              <Button
                key="submit"
                type="primary"
                onClick={() => setOpenLogs(false)}
              >
                Done
              </Button>
            </div>

            {userLogs?.length === 100 ? (
              <span>
                Please note that this database is limited to 100 entries as part
                of a specific task setup. Once the limit is reached, you'll need
                to manually clear out old entries to make space for new ones.
                Use the 'Clear' button.{" "}
              </span>
            ) : null}
          </div>,
        ]}
      >
        {loading ? (
          <div className="loading-spinner-container">
            <LoadingSpinner />
          </div>
        ) : userLogs?.length ? (
          <div>
            <List
              itemLayout="horizontal"
              dataSource={userLogs}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <span>
                        {new Date(item.createdAt)
                          .toLocaleString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          })
                          .replace(/,/, "")}
                      </span>
                    }
                    description={`The user requested ${
                      item.type_filter === "all"
                        ? "all"
                        : item.type_filter === "short-titles"
                        ? "short title"
                        : item.type_filter === "long-titles"
                        ? "long title"
                        : ""
                    } news`}
                  />
                </List.Item>
              )}
            />
          </div>
        ) : (
          <Empty />
        )}
      </Modal>
    </>
  );
}

export default LogsModal;
