import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter,Link} from 'react-router-dom'
import {allStudentsThunk} from '../store';

class AllStudents extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchAllStudents();

  }

render() {
  const students = this.props.students;
  const studentId = this.props.studentId;
  return (
  <div>
  <h3>All Students</h3>
      <table className = 'table' >
        <thead>
          <tr>
            <th>Student Id </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
      <tbody>
        {
          students.map(student => (
            <tr 
             key={student.id}>
            <td>{student.id }</td>
            <td>{student.firstName }</td>
            <td>{student.lastName }</td>
            <td>{student.email }</td>
            <td><Link to={`/students/${student.id}`} className="textColor">Edit</Link></td>
            
          </tr>
          
          ))
        }
      </tbody>
    </table>
    <div>
    <td><Link to={"/addStudentInfo"} className="textColor">Add Student</Link></td>
    </div>  
</div>
  )
}

 }

const mapStateToProps = (state) => {
  return {
    students: state.studentStore
  
  }
}
//ES5
// const mapDispatchToProps = function (dispatch){
//   return {
//     fetchAllStudents (){
  //dispatch(allStudentsThunk())
//}
//   }
// }

const mapDispatchToProps = (dispatch) => (
  {fetchAllStudents: () => dispatch(allStudentsThunk())}
)



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllStudents));


