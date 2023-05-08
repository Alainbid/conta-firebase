import React, { useState, useEffect } from "react";
import "../styles/calendar.scss";



const Calendar = () => {
  // const [today,setToday] = useState<Date>( new Date());
  const [today] = useState<Date>(() => new Date());
  const [month, setMonth] = useState(() => today.getMonth());
  const [year, setYear] = useState(() => today.getFullYear());
  const [nDays, setnDays] = useState(() =>
    new Date(year, month + 1, 0).getDate()
  );
  const [startDay, setStartDay] = useState(() =>
    new Date(year, month, 1).getDay()
  );
  const [day, setday] = useState(() => today!!.getDate());

  const monthTag = [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Jun",
    "Jul",
    "Aou",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const days = document.getElementsByTagName("td");
  
  // console.log("days", days);
  // console.log("startday", startDay);
  // console.log("ndays", nDays);

  useEffect(() => {
    for (let k = 0; k < 42; k++) {
      days[k].innerHTML = "";
      days[k].id = "";
      days[k].className = "";
    }
    document.getElementById('btn')!!.style.display="none"; 
    setnDays(new Date(year, month + 1, 0).getDate());
    setStartDay(new Date(year, month, 1).getDay());
    var n = startDay;
    for (let i = 1; i <= nDays; i++) {
      days[n].innerHTML = i.toString();
      n++;
    }
    let v = 0;
    for (let j = 0; j < 42; j++) {
      if (days[j].innerHTML === "") {
        days[j].id = "disabled";
        v++;
      } else {
        days[j].id = "today";
        let s = v - 1;
        days[day + s].id = "selected";
        days[j].addEventListener("click", () => {
          setday(j - s);
          days[j].id = "selected";
          document.getElementById('btn')!!.style.display="block"; 
        });
      }
    }

  },[year, month, startDay, days, nDays, day]);

  const preMonth = () => {
    if (month < 1) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month > 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div>
      <button id="btn" >Calendrier</button>
      <div className="elegant-calencar">
        <div id="header" className="clearfix">
          <div className="pre-button" onClick={() => preMonth()}>
            {"<"}
          </div>
          <div className="head-info">
            <div className="head-month">
              {day}
              {"-"}
              {monthTag[month]}
              {"-"}
              {year}
            </div>
          </div>
          <div className="next-button" onClick={() => nextMonth()}>
            {">"}
          </div>
        </div>
        <table id="calendar">
          <thead className="th-cal">
            <tr className="tr-cal">
              <th>Dim</th>
              <th>Lun</th>
              <th>Mar</th>
              <th>Mer</th>
              <th>Jeu</th>
              <th>Ven</th>
              <th>Sam</th>
            </tr>
          </thead>
          <tbody  className="tb-cal">
            <tr className="tr-cal">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
