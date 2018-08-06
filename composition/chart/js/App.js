function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function compareNumbers(a, b) {
  return a - b;
}

const chartsPropertiesList = [
	{
		isSum: false,
		style: {
			height: 250
		},
		chartsType: 'noName',
		chartsUnitClassName: 'Charts',
		chartsSerieClassName: 'Charts--serie',
		chartsItemClassName: 'Charts--item'
	},
	{
		isSum: true,
		style: {
			height: 250
		},
		chartsType: 'stacked',
		chartsUnitClassName: 'Charts',
		chartsSerieClassName: 'Charts--serie stacked',
		chartsItemClassName: 'Charts--item stacked'
	},
	{
		isSum: false,
		style: {
			height: 250
		},
		chartsType: 'layered',
		chartsUnitClassName: 'Charts',
		chartsSerieClassName: 'Charts--serie layered',
		chartsItemClassName: 'Charts--item layered'
	},
	{
		isSum: false,
		style: {
			height: 'auto'
		},
		chartsType: 'horizontal',
		chartsUnitClassName: 'Charts horizontal',
		chartsSerieClassName: 'Charts--serie',
		chartsItemClassName: 'Charts--item'
	}
]

const NoNameStyle = (...values) => {
  const [color, item, max, size] = values;
	return {
		backgroundColor: color,
		opacity: item/max + .05,
		zIndex: item,
		height: size + '%'
	}
};

const StackedStyle = (...values) => {
	const [color, item, max, size] = values;
	return {
		backgroundColor: color,
		opacity: 1,
		zIndex: item,
		height: size + '%'
	}
};

const LayeredStyle = (...values) => {
	const [color, item, max, size, serie, sortedSerie] = values;
	return {
		backgroundColor: color,
  	opacity: (item/max + .05),
  	zIndex: item,
    height: size + '%',
    right: ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%'
	}
};

const HorizontalStyle = (...values) => {
	const [color, item, max, size] = values;
	return {
		backgroundColor: color,
  	opacity: (item/max + .05),
  	zIndex: item,
    width: size + '%'
	}
};

const chartsTypeStyles = {
  'noName': NoNameStyle,
  'stacked': StackedStyle,
  'layered': LayeredStyle,
  'horizontal': HorizontalStyle
};

const ChartsItems = (props) => {
	const {className, style, itemIndex, item} = props;
	return (
		<div
			className={className}
			style={ style }
			key={ itemIndex }
		>
			<b style={{ color: style.color }}>{ item }</b>
 		</div>
	)
};

const ChartsSerie = (props) => {
	const {className, serieIndex, style, labels, serie, sortedSerie, colors, chartsType, max, itemClassName, sum} = props;
	return (
		<div className={className}
      key={ serieIndex }
      style={style}
    >
    <label>{ labels[serieIndex] }</label>
		{ serie.map((item, itemIndex) => {
			var color = colors[itemIndex];
			var size = sum ? item / sum * 100 : item / max * 100;
			var style = chartsTypeStyles[chartsType](color, item, max, size, serie, sortedSerie);
			return (
				<ChartsItems
					className={itemClassName}
					style={style}
					itemIndex={itemIndex}
					item={item}
				/>
			);
			})}
		</div>
	)
}

const ChartsSerieList = ({data, colors, labels, chartsSerieClassName, style, chartsType, max, chartsItemClassName, isSum}) => {
	return (
		data.map((serie, serieIndex) => {
			var sortedSerie = serie.slice(0);
			let sum = isSum ? serie.reduce((carry, current) => carry + current, 0) : null;
			sortedSerie.sort(compareNumbers);
			return (<ChartsSerie
				key={serieIndex}
				className={chartsSerieClassName}
				serieIndex={serieIndex}
				style={style}
				labels={labels}
				serie={serie}
				sortedSerie={sortedSerie}
				colors={colors}
				chartsType={chartsType}
				max={max}
				itemClassName={chartsItemClassName}
				sum={sum}
			/>
		)
	})
	)
}

const ChartsUnitList = ({...param}) => {
	const {props, chartsPropertiesList} = param;
  const {data, labels, colors, max} = props;

  return chartsPropertiesList.map((item, i) => {
    const {isSum, style, chartsType, chartsUnitClassName, chartsSerieClassName, chartsItemClassName} = item;
    return (
      <ChartsUnit
			key={i}
			data={data}
			labels={labels}
			colors={colors}
			max={max}
			isSum={isSum}
			style={style}
			chartsType={chartsType}
			chartsUnitClassName={chartsUnitClassName}
			chartsSerieClassName={chartsSerieClassName}
			chartsItemClassName={chartsItemClassName}
		>
			{ChartsSerieList}
			</ChartsUnit>
		)
	})
}

const ChartsList = (props) => {
	return <div>{props.children({props, chartsPropertiesList})}</div>;
}

const ChartsUnit = props => {
  return (
    <div className={props.chartsUnitClassName}>
      {props.children({...props})}
    </div>
  )
};

const LegendList = ({labels, colors}) => {

	return (
		<div className="Legend">
    			{ labels.map((label, labelIndex) => {
    				return (
    				<div>
    					<span className="Legend--color" style={{ backgroundColor: colors[labelIndex % colors.length]  }} />
    					<span className="Legend--label">{ label }</span>
    				</div>
    				);
					}) }
  	</div>
	)
}

class App extends React.Component {
	componentWillMount() {
		this.setState({
			data: [],
			series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
			labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
			colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
		})
	}

	componentDidMount() {
		this.populateArray();
		setInterval(this.populateArray.bind(this), 2000);
	}

	populateArray() {
		const	series = 5;
		const serieLength = 5;

    let data = new Array(series).fill(new Array(serieLength).fill(0));
    data = data.map(serie => serie.map(item => getRandomInt(0, 20)));

		this.setState({ data });
	}

	render() {
		const { data, colors, labels, series } = this.state;
		const max = data.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);

		return (
			<section>
				<ChartsList
          data={data}
          colors={colors}
          labels={labels}
          max={max}
        >
          {ChartsUnitList}
        </ChartsList>

				<LegendList
					labels={labels}
					colors={colors}
				/>
			</section>
		);
	}
}
