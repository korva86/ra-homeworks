'use strict';

class SubscribeForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        valid: ''
      }
      this.changeEmail = this.changeEmail.bind(this);
    }
    
    render() {
        return (
            <div className="subscribe__form">
                <form className={"form form--subscribe " + this.state.valid}>
                    <h4 className="form-title">Подписаться:</h4>
                    <div className="form-group">
                        <label htmlFor="input-email" className="sr-only">Email</label>
                        <input 
                            className="form-control"
                            type="email" 
                            id="input-email" 
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.changeEmail}
                        />
                        <div className="form-error">Пожалуйста, проверьте корректность адреса электронной почты</div>
                        <button type="submit" className="form-next">
                            <i className="material-icons">keyboard_arrow_right</i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
    changeEmail(event) {
        this.setState({ email: event.currentTarget.value }); 
        if (event.currentTarget.value == "") {
            this.setState({ valid: 'is-error' });
        } else if (event.currentTarget.validity.valid) {this.setState({ valid: 'is-valid' });}
        else {this.setState({ valid: 'is-error' });}
    }
}