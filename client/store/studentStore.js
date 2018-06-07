import axios from 'axios';

/**
 * INITIAL STATE
 */
const currentStudents = [];


/**
 * ACTION TYPES
 */
//const GET_SINGLESTUDENT = 'GET_SINGLESTUDENT'
const GET_STUDENTS = 'GET_STUDENTS'
const EDIT_STUDENT = 'EDIT_STUDENT'
const ADD_STUDENT = 'ADD_STUDENT'
const DELETE_STUDENT = 'DELETE_STUDENT'

/**
 * ACTION CREATORS
 */
export const getStudents = students => ({type: GET_STUDENTS, students});
export const editStudent = student => ({type: EDIT_STUDENT, student });
export const addStudent = student => ({type: ADD_STUDENT, student});
export const deleteStudent = id => ({type: DELETE_STUDENT, id});




/**
 * THUNK CREATORS
 */
export const allStudentsThunk = () =>
  dispatch => 
    axios.get('/api/students')
    .then(res =>
      dispatch(getStudents(res.data || currentStudents)))
    .catch(err => console.log(err));

    
export const updateStudentThunk = (id,student) => 
dispatch => {
  console.log(student);
  console.log(id);
  return axios.put(`/api/students/${id}`, student)
  .then(res => {
  dispatch(editStudent(res.data))
  })
  .catch(err => console.log(err))
}

export const addStudentThunk = (newStudent) =>
 dispatch => { 
  axios.post('/api/students', newStudent)
  .then(res => {
    dispatch(addStudent(res.data))
  })
  .catch(err => console.log(err))
}

// export const deleteStudentThunk = (id, history) => dispatch => {
//   axios.delete(`/api/students/${id}`)
//   .then(() => {
//     dispatch(deleteStudent(id))
//     history.push('/students')
//   })
 
//   .catch(err => console.error(`Removing student: ${id} unsuccessful.`))
// }
export const deleteStudentThunk = (id) =>
  dispatch =>
    axios.delete(`/api/students/${id}`)
      .then(() => dispatch(deleteStudent(id)))
      .catch(err => console.error('error from deleteStudentThunk', err))

/**
 * REDUCER
 */
export default function (state = currentStudents, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return action.students
    case EDIT_STUDENT:
      return state.map(student => ( action.student.id  === student.id ? action.student : student))
    case ADD_STUDENT:
      return [...state, action.student]
    case DELETE_STUDENT:
      return state.filter(student => student.id !== action.student.id)
    default:
      return state
  }
}



