'use strict';

const DateInput = props => {
  return (
      <div className="form-group">
          <label>{props.label}</label>
          <input type="text" className="form-control" name={props.name} onChange={props.onChange}
                 value={props.value} required={props.required} placeholder="YYYY-MM-DD"/>
      </div>
  )
};

DateInput.defaultProps = {
  value: (new Date().toISOString().substring(0, 10))
}

DateInput.propTypes = {
  onChange: PropTypes.func.isRequired,

  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
}
