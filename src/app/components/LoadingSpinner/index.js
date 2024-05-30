"use client";

import { Spin } from "antd";
import './customSpin.css';

export default function LoadingSpinner() {

  return (
    <div className="custom-spin">
      <Spin size="large"  />
    </div>
  );
}
