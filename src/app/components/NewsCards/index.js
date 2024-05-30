import React, { useEffect, useRef, useState } from 'react';
import './newsCards.css';  // Assuming you saved the above CSS in ScrollList.css

function ScrollList() {
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
    list.addEventListener('scroll', handleScroll);
    handleScroll();  // Initial check

    return () => list.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="wrapper">
      <div className="scroll-list">
        <div ref={listRef} className="scroll-list__wrp">
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className={`scroll-list__item ${visibleItems.has(i) ? 'visible' : ''}`}>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScrollList;
