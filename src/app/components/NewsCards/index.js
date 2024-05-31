import React, { useEffect, useRef, useState } from "react";
import "./newsCards.css";
import { Tag } from "antd";

function ScrollList({ news }) {
  const listRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const list = listRef.current;
      if (!list) return;

      const items = Array.from(list.children);
      const visible = new Set();
      items.forEach((item, index) => {
        const { top, bottom } = item.getBoundingClientRect();
        const listRect = list.getBoundingClientRect();
        if (top < listRect.bottom && bottom > listRect.top) {
          visible.add(index);
        }
      });
      setVisibleItems(visible);
    };

    const list = listRef.current;
    list.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => list.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="wrapper">
      <div className="scroll-list">
        <div ref={listRef} className="scroll-list__wrp">
          {news.map((item, index) => (
            <div
              key={index}
              className={`scroll-list__item ${
                visibleItems.has(index) ? "visible" : ""
              }`}
            >
              <h2 className="cardTitle">{item.title}</h2>
              <div>
                <Tag color="geekblue">Comments: {item.comments}</Tag>
                <Tag color="purple">Points: {item.points}</Tag>
              </div>
            </div>
          ))  }
          
        </div>
      </div>
    </div>
  );
}

export default ScrollList;
