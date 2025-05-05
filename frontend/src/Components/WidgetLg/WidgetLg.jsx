import { transactions } from "./../../datas";
import { FaCircleDollarToSlot } from "react-icons/fa6";

import "./WidgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"WidgetLgButton " + type}>{type}</button>;
  };

  return (
    <div className="WidgetLg">
      <h3 className="WidgetLgTitle">آخرین تراکنش ها</h3>
      <table className="WidgetLgTable">
        <thead>
          <tr className="WidgetLgTr">
            <th className="WidgetLgTh">مشتری</th>
            <th className="WidgetLgTh">تاریخ</th>
            <th className="WidgetLgTh">مقدار</th>
            <th className="WidgetLgTh">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="WidgetLgTr">
              <td className="WidgetLgUser">
                <FaCircleDollarToSlot 
                  // src={transaction.img}
                  // alt="transaction"
                  className="WidgetLgImg"
                />
                <span className="WidgetLgName">{transaction.customer}</span>
              </td>
              <td className="WidgetLgDate">{transaction.date}</td>

              <td className="WidgetLgAmount">${transaction.amount}</td>

              <td className="WidgetLgStatus">
                <Button type={transaction.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
