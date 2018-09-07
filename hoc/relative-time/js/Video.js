'use strict';

const Video = props => {
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <PrettyDateTime date={props.date} />
        </div>
    )
};


const prettyDate = (Component) => {
    return class prettifyDate extends React.Component {

        getDateDiff(dateFromData, DateTo = new Date()) {
            const DateFrom = dateFromData instanceof Date ? dateFromData : new Date(dateFromData);
            const DATEDIFF = (DateTo.getTime() - DateFrom.getTime());

            return {
                days: Math.floor(DATEDIFF / (24 * 60 * 60 * 1000)),
                hours: Math.floor(DATEDIFF / (60 * 60 * 1000)),
                minutes: Math.floor(DATEDIFF / (60 * 1000))
            };
        }

        prettyDateFunc(diffTime) {
            if (diffTime.days) {
                return `${diffTime.days} дней назад`;
            } else if (diffTime.hours) {
                return `${diffTime.hours} часов назад`;
            } else if (diffTime.minutes) {
                return `${diffTime.minutes} минут назад`;
            } else return null;
        } 

        render () {
            const TIMEDIFF = this.getDateDiff(this.props.date);
            const PRETTYDATE = this.prettyDateFunc(TIMEDIFF)
            return <Component {...this.props} date={PRETTYDATE} />
        }
    }
}

const PrettyDateTime = prettyDate(DateTime);