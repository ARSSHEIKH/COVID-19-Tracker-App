import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// const myelement = (
//     <table>
//         <tr>
//             <td>Name: </td>
//             <input type="text"/>
//         </tr>
//     </table>
// )
// ReactDOM.render(myelement, document.getElementById("root"));

// function Car(){
//     return <h1>Hello </h1>
// }
// ReactDOM.render(<Car/>, document.getElementById("root"));
// class Car extends React.Component{
//     render(){
//         return <h2>Hello</h2>
//     }
// }
// ReactDOM.render(<Car/>, document.getElementById("root"));

// class Car extends React.Component{
//     constructor(){
//         super();
//         this.state = {color:"black"};
//     }
//     render(){
//         return <h2>This is {this.state.color} </h2>
//     }
// }
// ReactDOM.render(<Car/>, document.getElementById("root"));


// class Car extends React.Component{

//     render(){
//         return <h2>This is {this.props.color} </h2>
//     }
// }
// ReactDOM.render(<Car color="black"/>, document.getElementById("root"));

// class Car extends React.Component{

//     render(){
//         return <h2>This is a car </h2>
//     }
// }
// class Garage extends React.Component{

//     render(){
//         return (
//             <div>
//                 <h1>What is this?</h1>
//                 <Car/>
//             </div>
//         );
//     }
// }

// ReactDOM.render(<Garage/>, document.getElementById("root"));

//ReactDOM.render(<Form1/>, document.getElementById("root"));

//ReactDOM.render(<Car />, document.getElementById('root'));




// PROPS
//Ex1
// class Car extends React.Component {
//     render() {
//       return <h2>I am a {this.props.color} Car!</h2>;
//     }
//   }
  
//   ReactDOM.render(<Car color="red"/>, document.getElementById('root'));

// //Ex2

//   class Car extends React.Component{
//     render(){
//         return <h2>I am a {this.props.brand}!</h2>
//     }
// }
// const myelement = <Car brand="Ford" />;
// ReactDOM.render(myelement, document.getElementById('root'));

//Ex3
// class Car extends React.Component {
//     render() {
//       return <h2>I am a {this.props.brand}!</h2>;
//     }
//   }
//   class Garage extends React.Component {
//     render() {
//       return (
//         <div>
//         <h1>Who lives in my Garage?</h1>
//         <Car brand="Car"/>
//         </div>
//     );
//   }
// }
// ReactDOM.render(<Garage/>, document.getElementById('root'));

// //Ex4
// class Car extends React.Component {
//     render() {
//       return <h2>I am a {this.props.brand}!</h2>;
//     }
//   }
//   class Garage extends React.Component {
//     render() {
//         const carname = "Corolla";
//       return (
//         <div>
//         <h1>Who lives in my Garage?</h1>
//         <Car brand={carname}/>
//         </div>
//     );
//   }
// }
// ReactDOM.render(<Garage/>, document.getElementById('root'));

// //Ex5
// class Car extends React.Component {
//     render() {
//       return <h2>I am a {this.props.brand}!</h2>;
//     }
//   }
// class Garage extends React.Component {
//     render() {
//         const carinfo = {name: "Ford", model: "Mustang"};
//         return (
//             <div>
//             <h1>Who lives in my Garage?</h1>
//             <Car brand={carinfo.model}/>
//             </div>
//         );
//     }
// }
// ReactDOM.render(<Garage/>, document.getElementById('root'));


//Ex6 Props in the Constructor

// class Car extends React.Component {
//     constructor(props){
//         super(props);
//         console.log(props)
//         console.log(props.brand)
//     }
//     render() {
//       return <h2>I am a car!</h2>;
//     }
//   }

// ReactDOM.render(<Car brand = "Toyota" />, document.getElementById('root'));













// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
