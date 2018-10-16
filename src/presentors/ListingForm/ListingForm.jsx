// import React, { Component } from 'react'
// // import fire from '../../utils/fire';


// export default class ListingForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             id: '',
//             description: ''
//         };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         const target = event.target;
//         const value = target.type === 'checkbox' ? target.checked : target.value;
//         const name = target.name;

//         this.setState({
//             [name]: value
//         });
//     }

//     // addMessage(e) {
//     //     e.preventDefault(); // <- prevent form submit from reloading the page
//     //     /* Send the message to Firebase */
//     //     fire.database().ref('listings').push(this.inputEl.value);
//     // }

//     // addListing(e) {
//     //     e.preventDefault(); // <- prevent form submit from reloading the page
//     //     /* Send the message to Firebase */
//     //     fire.database().ref('listingsobj').push({des: this.inputEl.value, description: this.inputEl.value});
//     //     this.inputEl.value = ''; // <- clear the input
//     // }

//     handleSubmit(event) {
//         // console.log(this.props.submitAction)
//         this.addMessage(event)
//         this.addListing(event)
//         this.props.submitAction(this.state.id, this.state.description);
//         event.preventDefault();
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <label>
//                     Description:
//                     <input type="text" ref={el => this.inputEl = el} name='description' value={this.state.value} onChange={this.handleChange} />
//                 </label>
//                 <input type="submit" value="Submit" />
//             </form>
//         );
//     }
// }

