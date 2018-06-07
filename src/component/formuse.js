import React from 'react';

export default class FormUse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    };
  }
render() {
  return(
    <div>
      <FormInput count={this.state.count}/>
      <FormInput />
    </div>
  );
}
}
class FormInput extends React.Component {
  constructor(props){
    super(props);
   this.add = this.add.bind(this);
 }
  add(e){
  e.preventDefault();
  const var1 = this.props.count;
  const var2 = parseInt(e.target.elements.textInput.value,10);
  // console.log(var1);
  // console.log(var2);
  if(isNaN(var1)){
    console.log(var2);
  }
  else{
    console.log(var1+var2);
  }

  }
render() {
  return(
    <div>
      <form onSubmit ={this.add}>
        <input type="text" name="textInput"></input>
        <button>submit</button>
      </form>

    </div>
  );
}
}
