'use strict';

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

const TodayDate = ({date}) => {
    return (
        <div className="ui-datepicker-material-header">
            <div className="ui-datepicker-material-day">{daysWeekFull[date.getDay()]}</div>
            <div className="ui-datepicker-material-date">
                <div className="ui-datepicker-material-day-num">{date.getDate()}</div>
                <div className="ui-datepicker-material-month">{monthsInDate[date.getMonth()]}</div>
                <div className="ui-datepicker-material-year">{date.getFullYear()}</div>
            </div>
        </div>
    )
}

const MonthAndYear = ({date}) => {
    return (
        <div className="ui-datepicker-header">
            <div className="ui-datepicker-title">
                <span className="ui-datepicker-month">{months[date.getMonth()]}</span>&nbsp;<span class="ui-datepicker-year">{date.getFullYear()}</span>
            </div>
        </div>
    )
}

const Colgroup = () => {
    return (
        <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col /> 
            <col className="ui-datepicker-week-end" />
            <col className="ui-datepicker-week-end" />
        </colgroup>
    )
}

const TitlesWeeks = () => {
    return (
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
    )
}

const Calendar = ({date}) => {

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let firstDayCal = getMonday(firstDay);

    function getMonday(d) {
        var day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 1); 
        return new Date(d.setDate(diff));
      }

    const countWeeks = Math.ceil((lastDay - firstDay) / (1000 * 60 * 60 * 24 * 7));
    
    let allDays = new Array(countWeeks).fill(null);
    allDays = allDays.map((item, index) => {
        const week = <Weeks month={date.getMonth()} date={new Date(firstDayCal)} day={date.getDate()} />
        firstDayCal.setDate(firstDayCal.getDate() + 7);
        return week
    })

    return (
        <div className="ui-datepicker">
            <TodayDate date={date} />
            <MonthAndYear date={date} />
            <table className="ui-datepicker-calendar">
                <Colgroup />
                <TitlesWeeks />
                <tbody>
                    {allDays}
                </tbody>
            </table>
        </div>
    )
}

const Weeks = ({date, month, day}) => {
    let week = new Array(7).fill(null);
    week = week.map((item, index) => {
        const oneDay = <Day key={index} date = {new Date(date)} month={month} day={day}/>
        date.setDate(date.getDate()+ 1);
        return oneDay
    })

    return (
        <tr>
            {week}
        </tr>
    )
}

const Day = ({date, month, day}) => {
    const Style = () => {
        if (date.getMonth() !== month) {
            return "ui-datepicker-other-month"
        } else if (date.getMonth() === month && date.getDate() === day) {
            return "ui-datepicker-today"
        } else return ""
    }
    return (
        <td className = {Style()}>{date.getDate()}</td>
    )
}