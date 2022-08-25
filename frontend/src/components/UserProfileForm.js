import React, {Component} from "react";

class UserProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: props.data.firstName,
            lastName: props.data.lastName,
            email: props.data.email,
            phone: props.data.phone
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value});
    }

    handleLastNameChange(event) {
        this.setState({lastName: event.target.value})
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }

    handlePhoneChange(event) {
        this.setState({phone: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        // TODO: post user data to database
        console.log('Your update was submitted: ' + this.state);
    }

    render() {
        return (
            <form id="user-info-form">
                <div>
                    <div className="form-group">
                        <label>
                            First Name:
                            <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Last Name:
                            <input type="text" value={this.state.lastName} onChange={this.handleLastNameChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Email:
                            <input type="email" value={this.state.email} onChange={this.handleEmailChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Phone:
                            <input type="text" value={this.state.phone} onChange={this.handlePhoneChange} />
                        </label>
                    </div>
                </div>
                <a href="#" onClick={this.handleSubmit}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Update
                </a>
            </form>
        );
    }
}

export default UserProfileForm;