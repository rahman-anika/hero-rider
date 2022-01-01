// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider';
import PrivateRoute from './components/Login/PrivateRoute/PrivateRoute';
import AdminRoute from './components/Login/AdminRoute/AdminRoute';
import Home from './components/Home/Home/Home';
// import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login/Login';
import Register from './components/Login/Register/Register';
import RegisterType from './components/Login/RegisterType/RegisterType';
import RegisterLearner from './components/Login/RegisterLearner/RegisterLearner';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
import UpdateStatus from './components/Dashboard/UpdateStatus/UpdateStatus';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>

          <Switch>

            {/* Route for homepage  */}
            <Route exact path="/">
              <Home></Home>
            </Route>


            {/* Route for homepage  */}
            <Route path="/home">
              <Home></Home>
            </Route>


            {/* Route for login  */}
            <Route path="/login">
              <Login></Login>
            </Route>

            {/* Route for register  */}
            <Route path="/register">
              <Register></Register>
            </Route>


            {/* Route for register  */}
            <Route path="/registertype">
              <RegisterType></RegisterType>
            </Route>

            {/* Route for register  */}
            <Route path="/registerlearner">
              <RegisterLearner></RegisterLearner>
            </Route>



            {/* PrivateRoute for all products  */}
            <PrivateRoute path="/submitRecipe">
              {/* <SubmitRecipe></SubmitRecipe> */}
            </PrivateRoute>


            {/* Route for showing recipe details  */}
            <Route path="/recipeDetails/:serviceId">
              {/* <RecipeDetails></RecipeDetails> */}
            </Route>

            {/* Route for showing cooking class details  */}
            <Route path="/classDetails/:serviceId">
              {/* <ClassDetails></ClassDetails> */}
            </Route>

            {/* PrivateRoute for all products  */}
            <PrivateRoute path="/enroll/:serviceId">
              {/* <EnrolledClass></EnrolledClass> */}
            </PrivateRoute>



            {/* adminroute for update booking status  */}
            <AdminRoute exact path="/update/:orderId">
              <UpdateStatus></UpdateStatus>
            </AdminRoute>

            {/* Route for dashboard  */}
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>


            {/* Route for 404  */}
            <Route path="*">
              {/* <NotFound></NotFound> */}
            </Route>


          </Switch>

        </Router>
      </AuthProvider>

    </div>
  );
}

export default App;
