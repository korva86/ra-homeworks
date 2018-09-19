'use strict';

const Form = (props) => {
  return (
      <div className="col-md-5 offset-md-4">
          <h1 className="text-center">Registration</h1>
          <hr/>
          <form onSubmit={props.handleSubmit}>
              <TextInput label="Email Address" type="email" name="email" onChange={props.handleChange} value={props.email} required={true} />
              <TextInput label="First Name" type="text" name="first_name" onChange={props.handleChange} value={props.first_name} />
              <TextInput label="Last Name" type="text" name="last_name" onChange={props.handleChange} value={props.last_name} />
              <DateInput label="Birthday" name="birthday" onChange={props.handleChange} value={props.birthday} />
              <TextInput label="Password" type="password" name="password" onChange={props.handleChange} value={props.password} />
              <RadioGroup label="Sex" name="sex" onChange={props.handleChange} value={props.sex} list={['Male', 'Female']} />

              <button type="submit" className="btn btn-primary mt-2 float-right">Registration</button>
          </form>
      </div>
  )
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,

  email: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  birthday: PropTypes.string,
  password: PropTypes.string,
  sex: PropTypes.oneOf(['Male', 'Female'])
};
