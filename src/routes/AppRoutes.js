import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavbarComponent from '../components/navbar';
import Estudiante from '../containers/estudiantes';




export default class AppRoutes extends Component {


    render() {
        return (
            <div>
                <Router>
                    <NavbarComponent />
                    <Routes>
                        <Route exact path='/Estudiantes' element={<Estudiante />} />
                    </Routes>
                </Router>
            </div>
        )
    }

}