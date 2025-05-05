import React from 'react';
import Features from '../features/Feature'
import Chart from '../Chart/Chart'
import WidgetSm from '../widgetSm/widgetSm'
import WidgetLg from '../WidgetLg/WidgetLg'
import { xAxisData } from '../../datas';

import './Home.css'

export default function Home() {
  return (
    <div className="home cms-main">
      <Features />
      <Chart grid title="فروش ماهانه" data={xAxisData} dataKey="Sale" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}
