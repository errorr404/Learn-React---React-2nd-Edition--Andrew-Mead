// create a parent componment which held all the react Component
import React from 'react';

// class IndecisionApp = (props) =>{
//
// }
export default class IndecisionApp extends React.Component {
  constructor(props){
    super(props);
      this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
      this.handlePick = this.handlePick.bind(this);
      this.handleAddOption = this.handleAddOption.bind(this);
      this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state= {
    options: props.options
    };
  }
  // lifecycle methods componentDidMount(),componentDidUpdate(),  componentWillUnmount()

  componentDidMount(){
    // console.log('fetching Data');
    try{
      const json = localStorage.getItem('options');
         const options = JSON.parse(json);

         if (options) {
           this.setState(() => ({ options }));
         }
    }catch(e) {
        // Do nothing at all;

    }

  }
  // componentDidUpdate fire when there is any update
  componentDidUpdate(prevProps,prevState){
    if(prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options',json);
      // console.log('saving Data');
    }

  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  // handleDeleteOptions
  handleDeleteOptions() {
    // this.setState(() => {
    //   return {
    //     options: []
    //   };
    // });
     this.setState(()=>({options:[]}));
  }
  handleDeleteOption(optiontoRemove) {
    // console.log('hdo',option);
    this.setState((prevState)=>({
     options: prevState.options.filter((option)=>{
       return optiontoRemove !==option;
     })
    }));
  }
// hadlePick - pass down to Action and setup onClick - bind Here
// rendomly pick an option and alert it
handlePick(){
  const len = this.state.options.length;
  const rand = Math.floor(Math.random()*len);
  alert(this.state.options[rand]);
}

handleAddOption(option){
  if(!option){
    return 'Enter valid value to add item';
  }
  else if(this.state.options.indexOf(option)> -1){
    return 'This option Already exist'
  }
  // this.setState((prevState)=>{
  //   return {
  //   options: prevState.options.concat(option)  // concat in the prev aarray
  //   };
  // });
  this.setState((prevState)=>({options: prevState.options.concat(option) }));
}
  render(){
    const subTitle = 'Put your life in the hands of a computer';
    return(
      <div>
        <Header subTitle={subTitle}/>
        <Action hasOptions={this.state.options.length >0}
          handlePick={this.handlePick}
         />
        <Options
          options ={this.state.options}
         handleDeleteOptions={this.handleDeleteOptions}
         handleDeleteOption={this.handleDeleteOption}
        />
        <AddComponent
          handleAddOption={this.handleAddOption}
        />
        {/* <User /> */}
      </div>
    );
  }
}
// Create a react Component
// Here first create the react component

IndecisionApp.defaultProps = {
  options: []
}
// change Header to stateless Function

const Header = (props)=>{
  return (
    <div>
      <h1>{props.title}</h1>
    {props.subTitle && <h2>{props.subTitle}</h2>}
    </div>
  );
}

Header.defaultProps = {
 title: 'Indecision'
};

// class Header extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <h2>{this.props.subTitle}</h2>
//       </div>
//     );
//   }
// }

// change Action to Stateless Function
const Action = (props)=>{
  return (
    <div>
      <button
        onClick={props.handlePick}
        disabled = {! props.hasOptions}>
        What should I do?</button>
    </div>
  );
};


// class Action extends React.Component {
//
//   render() {
//     return (
//       <div>
//         <button
//           onClick={this.props.handlePick}
//           disabled = {! this.props.hasOptions}>
//           What should I do?</button>
//       </div>
//     );
//   }
// }


// challange
// Option -> Option Component here
// AddOption -> AddOption component here.

// add remove all button
// Setup handleRemoveAll -> alert some message
// setup onClick to fire

// change Options to Stateless Function
const Options = (props)=>{
  return (
        <div>
          <button onClick={props.handleDeleteOptions}>Remove All</button>
          {props.options.length === 0 && <p>Please add an option to get started</p>}
          {
            // this.props.options.map((option)=><p key={option}>{option}</p>)
            props.options.map((option)=> (
              <Option
                key={option}
                optionText={option}
                handleDeleteOption={props.handleDeleteOption}
              />
            ))

          }
        </div>
      );
};

// class Options extends React.Component {
//   // here we use the constructor to use the bind method bcz of this keyword.
//
//   // handleRemoveAll(){
//   //   console.log(this.props.options);
//   //   alert('handleRemoveAll');
//   // }
//
//   render(){
//     return (
//           <div>
//             <button onClick={this.props.handleDeleteOptions}>Remove All</button>
//             {
//               // this.props.options.map((option)=><p key={option}>{option}</p>)
//               this.props.options.map((option)=> <Option key={option} optionText={option} />)
//
//             }
//           </div>
//     );
//   }
// }

// Option -> Option component Here
// change Option to Stateless Function
const Option = (props)=>{
  return(
      <div>
      {props.optionText}
      <button onClick={(e)=>{
        props.handleDeleteOption(props.optionText);
      }}

        >remove</button>
      </div>
  );
};

// class Option extends React.Component {
//   render(){
//     return(
//
//         <div>
//         {this.props.optionText}
//         </div>
//
//
//     );
//   }
// }


// 1 .setup the form with input and submit button
// 2. Wire up onSubmit
// 3. handleAddOption -> fetch the value typed -> if value,then start
class AddComponent extends React.Component {
  constructor(props){
    super(props);
    this.handleAddOption =this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }
  handleAddOption(e) {

    e.preventDefault();

    const option = e.target.elements.option.value.trim(); // trim leading and trilling spaces
     const error = this.props.handleAddOption(option);
    //console.log(option);
    // this.setState(()=>{
    //   return {
    //     error: error
    //     // error
    //   };
    // });
    this.setState(()=>({error: error}));
    if(!error) {
      e.target.elements.option.value = '';
    }
  }
  render(){
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption} >
          <input type="text" placeholder="enter text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}
// const User = ()=>{
//    return (
//
//      <div>
//      <h1>Name: </h1>
//      <h1>Age: </h1>
//    </div>
//    );
// };
