import React from 'react';

export default class Form extends React.Component{
  constructor(props){
     super(props);
    this.calculate = this.calculate.bind(this);
     this.state = {
       exp: 'a + b',
       result: 'c'
     };
  }

  calculate(e){
    e.preventDefault();
     const exp = e.target.elements.expression.value;
     let result = 0;
     if(exp.indexOf('+')>-1){
       const expArray = parseInt(exp.split('+')[0],10);
       const expArray2 = parseInt(exp.split('+')[1],10);
            result = expArray + expArray2;
     }
     else  if(exp.indexOf('-')>-1){
        const expArray = parseInt(exp.split('-')[0],10);
        const expArray2 = parseInt(exp.split('-')[1],10);
             result = expArray - expArray2;
      }
      else  if(exp.indexOf('*')>-1){
         const expArray = parseInt(exp.split('*')[0],10);
         const expArray2 = parseInt(exp.split('*')[1],10);
              result = expArray * expArray2;
       }
       else  if(exp.indexOf('/')>-1){
          const expArray = parseInt(exp.split('/')[0],10);
          const expArray2 = parseInt(exp.split('/')[1],10);
               result = parseFloat(expArray / expArray2);
        }

    this.setState(()=>{
       return{
          exp: exp,
          result: result
       };
    });
  }
  render(){
    return(
      <div>
      <form onSubmit={this.calculate}>
        <input type="text" name="expression"></input>
        <button>Calculate</button>
      </form>
         <h1>{this.state.exp} = {this.state.result} </h1>
    </div>
    );
  }
}
