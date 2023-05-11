import React, { useState, useEffect } from "react";
import "../styles/calendar0.scss";

const Calendar0 = () => {
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
  const [selDate, setSelDate] = useState(day + "/" + (month + 1) + "/" + year);
  // const [selDate,setSelDate] =useState("");

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

const handleChange:any = () => {
  setSelDate(day + "/" + (month + 1) + "/" + year);
}

  useEffect(() => {
    for (let k = 0; k < 42; k++) {
      days[k].innerHTML = "";
      days[k].id = "";
      days[k].className = "";
    }
    // document.getElementById('btn')!!.style.display="none";
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
        days[j].id = "disabled0";
        v++;
      } else {
        days[j].id = "today0";
        let s = v - 1;
        days[day + s].id = "selected0";
        days[j].addEventListener("click", () => {
          setday(j - s);
          days[j].id = "selected0";
          console.log(day, month + 1, year);
         
        });
      }
    }
     handleChange(selDate);
    console.log("calendar 2 seldate", selDate);
  }, [year, month, startDay, days, nDays, day, selDate]);

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
      

      <div className="elegant-calencar0">
        <div id="header" className="clearfix">
          <div className="pre-button" onClick={() => preMonth()}>
            {"<"}
          </div>
          <div className="head-info">
            <div className="head-month0">
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
        <table id="calendar0">
          <h5></h5>
          <tbody className="tb-cal0">
            <tr className="tr-cal0">
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

export  default Calendar0 ;
