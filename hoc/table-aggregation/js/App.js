'use strict';

const DateSort = (Component) => class extends React.Component {
    sortData(Data) {
        if(!Data.length) {return []};
        return Data.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        })
    };

    render () {
        return <Component {...this.props} list={this.sortData(this.props.list)} />
    }
}

const DateSortTable = DateSort(SortTable);

const YearSort = (Component) => class extends React.Component {
    sortData(dataArray) {
        if (!dataArray.length) return [];

        return dataArray.reduce((acc, cur) => {
            if(acc.length === 0) {return [{year: cur.date.split('-')[0], amount: cur.amount}]}
            else {
                const currYear = cur.date.split('-')[0];
                const index = acc.findIndex((x) => x.year.split('-')[0] ===currYear);
                if(index > -1) {
                acc[index].amount += cur.amount;
                return acc;
                } else {
                return acc.concat({year: currYear, amount: cur.amount});
                }
            }
        }, []);
    }

    render () {
        return <Component {...this.props} list={this.sortData(this.props.list)} />
    }
}

const YearSortTable = YearSort(YearTable);

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const MonthSort = (Component) => class extends React.Component {
    sortData (dataArray) {
        if (!dataArray.length) return [];
      const currYear = new Date().getFullYear().toString();
      const sortArray =  dataArray
        .sort((leftDate, rightDate) => {
          return ( new Date(leftDate.date) - new Date(rightDate.date) );
        })
      const index = sortArray.findIndex((x) => x.date.split('-')[0] === currYear)
      return sortArray
        .slice(index)
        .sort((a, b) => {
            return new Date(a.date).getMonth() - new Date(b.date).getMonth();
        })
        .reduce((acc, cur) => {
            if(acc.length === 0) {return [{month: cur.date.split('-')[1], amount: cur.amount}]}
            else {
                const currMonth = cur.date.split('-')[1];
                const index = acc.findIndex((x) => { return x.month ===currMonth});
                if (index > -1) {
                acc[index].amount += cur.amount;
                return acc;
                } else {
                return acc.concat({month: currMonth, amount: cur.amount});
                }
            }
        }, [])
        .map((item) => {
           item.month = months[parseInt(item.month)-1];
           return item
       })
    }

    render () {
        return <Component {...this.props} list={this.sortData(this.props.list)} /> 
    }
}

const MonthSortTable = MonthSort(MonthTable);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        axios.get('https://api.myjson.com/bins/l2s9l').then(response => {
            this.setState(response.data);
        });
    }

    render() {
        return (
            <div id="app">
                <MonthSortTable list={this.state.list} />
                <YearSortTable list={this.state.list} />
                <DateSortTable list={this.state.list} />
            </div>
        );
    }
};