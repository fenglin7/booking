import React, { Component } from 'react'

export default class ListingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            description: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        // console.log(this.props.submitAction)
        this.props.submitAction(this.state.id, this.state.description);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    ID:
                    <input type="text" name='id' value={this.state.value} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Description:
                    <input type="text" name='description' value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

