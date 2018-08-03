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

const chartsTypeStyles = {
  'noName': NoNameStyle,
  'stacked': StackedStyle,
  'layered': LayeredStyle,
  'horizontal': HorizontalStyle
};

const ChartsItems = (props) => {
	props = {className, style, itemIndex, item};
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

const NoNameStyle = (...values) => {
	values = {color, item, max, item, size};
	return {
		backgroundColor: color,
		opacity: item/max + .05,
		zIndex: item,
		height: size + '%'
	}
};

const StackedStyle = (...values) => {
	values = {color, item, max, item, size};
	return {
		backgroundColor: color,
		opacity: 1,
		zIndex: item,
		height: size + '%'
	}
};

const LayeredStyle = (...values) => {
	values = {color, item, max, item, size, sortedSerie};
	return {
		backgroundColor: color,
  	opacity: (item/max + .05),
  	zIndex: item,
    height: size + '%',
    right: ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%'
	}
};

const HorizontalStyle = (...values) => {
	values = {color, item, max, item, size};
	return {
		backgroundColor: color,
  	opacity: (item/max + .05),
  	zIndex: item,
    width: size + '%'
	}
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
			var style = chartsTypeStyles[chartsType](color, item, max, size, serie, sortedSerie);
			var	size = item / (max) * 100;
			return (
				<ChartsItem
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



        {/* <div className="Charts">
          { data.map((serie, serieIndex) => {
            var sortedSerie = serie.slice(0),
              sum;

            sum = serie.reduce((carry, current) => carry + current, 0);
            sortedSerie.sort(compareNumbers);

            return (
              <div className="Charts--serie"
                key={ serieIndex }
                style={{height: 250}}
              >
              <label>{ labels[serieIndex] }</label>
              { serie.map((item, itemIndex) => {
                var color = colors[itemIndex], style,
                  size = item / (max) * 100;

                style = {
                  backgroundColor: color,
                  opacity: item/max + .05,
                  zIndex: item,
                  height: size + '%'
                };

              return (
                <div
                  className="Charts--item"
                  style={ style }
                  key={ itemIndex }
                >
                  <b style={{ color: color }}>{ item }</b>
                 </div>
              );
              }) }
              </div>
            );
          }) }
        </div>

        <div className="Charts">
  				{ data.map((serie, serieIndex) => {
  				 	var sortedSerie = serie.slice(0),
  				 		sum;

  				 	sum = serie.reduce((carry, current) => carry + current, 0);
  				 	sortedSerie.sort(compareNumbers);

  					return (
  						<div className="Charts--serie stacked"
  				 			key={ serieIndex }
  							style={{ height: 250 }}
  						>
  						<label>{ labels[serieIndex] }</label>
  						{ serie.map((item, itemIndex) => {
  							var color = colors[itemIndex], style,
  								size = item / sum * 100;

  							style = {
  								backgroundColor: color,
  								opacity: 1,
  								zIndex: item,
                  height: size + '%'
  							};

  						 return (
  							 <div
  							 	className="Charts--item stacked"
  							 	style={ style }
  								key={ itemIndex }
  							>
  							 	<b style={{ color: color }}>{ item }</b>
  							 </div>
  						);
  						}) }
  						</div>
  					);
  				}) }
  			</div>

        <div className="Charts">
  				{ data.map((serie, serieIndex) => {
  				 	var sortedSerie = serie.slice(0),
  				 		sum;

  				 	sum = serie.reduce((carry, current) => carry + current, 0);
  				 	sortedSerie.sort(compareNumbers);

  					return (
  						<div className="Charts--serie layered"
  				 			key={ serieIndex }
  							style={{ height: 250 }}
  						>
  						<label>{ labels[serieIndex] }</label>
  						{ serie.map((item, itemIndex) => {
  							var color = colors[itemIndex], style,
  								size = item / (max) * 100;

  							style = {
  								backgroundColor: color,
  								opacity: (item/max + .05),
  								zIndex: item,
                  height: size + '%',
                  right: ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%'
  							};

  						 return (
  							 <div
  							 	className="Charts--item layered"
  							 	style={ style }
  								key={ itemIndex }
  							>
  							 	<b style={{ color: color }}>{ item }</b>
  							 </div>
  						);
  						}) }
  						</div>
  					);
  				}) }
  			</div>

        <div className="Charts horizontal">
  				{ data.map((serie, serieIndex) => {
  				 	var sortedSerie = serie.slice(0),
  				 		sum;

  				 	sum = serie.reduce((carry, current) => carry + current, 0);
  				 	sortedSerie.sort(compareNumbers);

  					return (
  						<div className="Charts--serie"
  				 			key={ serieIndex }
  							style={{ height: 'auto' }}
  						>
  						<label>{ series[serieIndex] }</label>
  						{ serie.map((item, itemIndex) => {
  							var color = colors[itemIndex], style,
  								size = item / (max) * 100;

  							style = {
  								backgroundColor: color,
  								opacity: (item/max + .05),
  								zIndex: item,
                  width: size + '%'
  							};

  						 return (
  							 <div
  							 	className="Charts--item"
  							 	style={ style }
  								key={ itemIndex }
  							>
  							 	<b style={{ color: color }}>{ item }</b>
  							 </div>
  						);
  						}) }
  						</div>
  					);
  				}) }
  			</div> */}

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
			</section>
		);
	}
}
