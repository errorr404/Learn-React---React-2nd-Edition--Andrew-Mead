import React from 'react';
export default class Practice extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      options: [],
      count: 0
    };
    this.addition=this.addition.bind(this);
  }
  addition(num){
     this.setState(()=>{
        return{
           count:this.state.count+num
        };
     });
  }

  render() {

    return (
      <div>
        <Header />
        <AddNumbers options={this.state.options} count={this.state.count} addition={this.addition}/>
        <Total count={this.state.count} />

      </div>
    );
  }
}
class Header extends React.Component {
  render(){
    // console.log(this.state.count);
    return(
      <div>
        <h1>Total Cost Calculator</h1>
        <p> Enter the value one by one in input field </p>
      </div>
    );
  }
}
// Add numbers
class AddNumbers extends React.Component {
  constructor(props){
    super(props);
    this.pushNumber = this.pushNumber.bind(this);
//    this.renderlist=this.renderlist.bind(this);
  }
  pushNumber (e)
  {
    e.preventDefault();
    const number1 = parseInt(e.target.elements.valueofNumber.value,10);
    //console.log(number1);
    //const number2 =this.props.count;
  //  console.log(number2);
    //const number3 = number1+number2;
  //  console.log(number3);
    this.props.options.push(number1);
    //console.log(this.props.options);
    this.props.addition(number1);
  //
  // const listItem = this.props.options.map((number)=>
  //   <ul>listItem</ul>


  }
  // renderlist(){
  //   const listItem = this.props.options.map((number)=>
  //     <ul>number</ul>);
  // }
  render() {
    const listItem = this.props.options.map((number)=>
      <ol key = {number}> number: {number}</ol>);
    return (
      <div>
        <form onSubmit={this.pushNumber}>
          <input type="text" placeholder="Enter the value" name="valueofNumber"/>
          <button>Add to the list</button>
        </form>
        {listItem}
      </div>
    );
  }
}
class Total extends React.Component {
  render(){
    return(
      <p> Total: {this.props.count}</p>
    );
  }
}
