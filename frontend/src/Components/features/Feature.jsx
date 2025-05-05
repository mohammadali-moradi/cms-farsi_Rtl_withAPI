import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import "./features.css";

export default function Feature() {
  return (
    <div className="features">
      <div className="featureItem">
        <span className="featureTitle">باز پرداخت</span>
        <div className="featureContainer">
          <span className="featureMoney">$۱,۴۵۰</span>
          <span className="featureRate">
            ۱۱.۳-  <ArrowDownwardIcon className="featureIcon negative" />
          </span>
        </div>
        <span className="featureSub">مقایسه با ماه قبل</span>
      </div>
      <div className="featureItem">
        <span className="featureTitle">فروش</span>
        <div className="featureContainer">
          <span className="featureMoney">$۲,۴۴۴</span>
          <span className="featureRate">
            ۱.۵- <ArrowDownwardIcon className="featureIcon negative" />
          </span>
        </div>
        <span className="featureSub">مقایسه با ماه قبل</span>
      </div>
      <div className="featureItem">
        <span className="featureTitle">هزینه ها</span>
        <div className="featureContainer">
          <span className="featureMoney">$2,415</span>
          <span className="featureRate">
            ۲.۸+ <ArrowUpwardIcon className="featureIcon" />
          </span>
        </div>
        <span className="featureSub">مقایسه با ماه قبل</span>
      </div>
    </div>
  );
}
