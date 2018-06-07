import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter,Link} from 'react-router-dom'
import {updateStudentThunk,deleteStudentThunk} from '../store';

class EditStudent extends Component {
  constructor(props) {
    super(props);

    //console.log('this.props', this.props)
    this.state = {
      id: this.props.student.id,
      firstName: this.props.student.firstName,
      lastName: this.props.student.lastName,
      email: this.props.student.email
    };
    this.emailHandleChange = this.emailHandleChange.bind(this);
    this.firstnameHandleChange = this.firstnameHandleChange.bind(this);
    this.lastnameHandleChange = this.lastnameHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   
  }
  emailHandleChange(event) {
    console.log(event.target.value);
    this.setState({email: event.target.value});
  }

  firstnameHandleChange(event) {
    console.log(event.target.value);
    this.setState({firstName: event.target.value});
  }

  lastnameHandleChange(event){
    this.setState({lastName: event.target.value});
  }

  handleSubmit(event) {
    //console.log("In handleSubmit");
    event.preventDefault();
    const id = this.props.studentId;
    //console.log("In handleSubmit"+id);
    const studentInfo = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
      
    };

    console.log(studentInfo);
    this.props.editStudentInfo(id, studentInfo);
  }

render() {
  const student = this.props.student;
  console.log(student)
  
  const studentId = this.props.studentId;
  return (
  <div>
  <h3>All Students</h3>
  <form className = "form-group" onSubmit = {(eve) => this.handleSubmit(eve)}> 
            <table className = 'table' >
            <tr>
                <td>Student Id : </td>    
                <td>{this.state.id }</td>
            </tr>
            <tr>
                <td>Student FirstName : </td>    
                <td><input type="text" name="firstName" value={this.state.firstName} onChange={this.firstnameHandleChange}/></td>
            </tr>
            <tr>
                <td>Student LastName : </td>    
                <td>{this.state.lastName }</td>
            </tr>
            <tr>
                <td>Student Email : </td>    
                <td><input type="text" name="email" value={this.state.email} onChange={this.emailHandleChange}/></td>
            </tr>
            </table>
            <div>
                    <button type="submit">update</button>
            </div>
            <button onClick={() => this.props.removeStudent(this.state.id)}>
          Delete 
          </button>
            
  </form>  
</div>
  )
}

 }

const mapStateToProps = (state,ownProps) => {
  const studentArr = state.studentStore;
  //console.log(studentArr)
  const studentId = ownProps.match.params.studentId;
  //console.log(studentId)
  const studentInfo = studentArr.filter(student => student.id === +studentId);
  console.log(studentInfo)
 
  return {
    student: studentInfo[0],
    studentId: studentId
  }
}

//Using return 

// const mapDispatchToProps = (dispatch,ownProps) => {
//   return {
//     editStudentInfo: (id,studentInfo) => dispatch((updateStudentThunk(id,studentInfo)))
//   }
// }

const mapDispatchToProps = (dispatch,ownProps) => ({
    editStudentInfo: (id,studentInfo) => dispatch((updateStudentThunk(id,studentInfo))),
    removeStudent(id){
      dispatch(deleteStudentThunk(id))
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditStudent));


