'use strict';

const Calendar = ({date}) => {

    const daysWeekFull = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ];

    const daysWeekSort = [
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб"
    ];

    const months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
    ];

    const monthsInDate = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря"
    ];

    

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let firstDayCal = getMonday(firstDay);
    console.log(getMonday(firstDay));

    function getMonday(d) {
        var day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6:1); 
        return new Date(d.setDate(diff));
      }

    const countWeeks = Math.ceil((lastDay - firstDay) / (1000 * 60 * 60 * 24 * 7));
    
    let allDays = new Array(countWeeks).fill(null);
    allDays = allDays.map((item, index) =>{
        const weeks = <Weeks month={date.getMonth()} date={firstDayCal} day={date.getDate()} />
        firstDayCal.setDate(firstDayCal.getDate() + 7);
        return week
    })

    
    console.log(countWeeks);
  
    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{daysWeekFull[date.getDay()]}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{date.getDate()}</div>
                    <div className="ui-datepicker-material-month">{monthsInDate[date.getMonth()]}</div>
                    <div className="ui-datepicker-material-year">{date.getFullYear()}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{months[date.getMonth()]}</span>&nbsp;<span class="ui-datepicker-year">{date.getFullYear()}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col /> 
                    <col className="ui-datepicker-week-end" />
                    <col className="ui-datepicker-week-end" />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="ui-datepicker-other-month">27</td>
                        <td className="ui-datepicker-other-month">28</td>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>7</td>
                        <td className="ui-datepicker-today">8</td>
                        <td>9</td>
                        <td>10</td>
                        <td>11</td>
                        <td>12</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const Weeks = ({date, month, day}) => {
    let week = new Array(7).fill(null);
    week.map((item, index) => {
        const day = <Day key={index} date = {} month={ } day={}/>
        date.setDate(date.getDate()+ 1);
        return day
    })
}