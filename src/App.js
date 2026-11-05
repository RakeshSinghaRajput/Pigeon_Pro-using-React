import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App =()=> {
 const pageSize = 10;

    return (
      <div>
        <Router>
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <News
                                key="general"
                                pageSize={pageSize}
                                category="general"
                                country=""
                            />
                        }
                    />
                    <Route
                        path="/business"
                        element={
                            <News
                                key="business"
                                pageSize={pageSize}
                                category="business"
                                 country="us"
                            />
                        }
                    />
                    <Route
                        path="/entertainment"
                        element={
                            <News
                                key="entertainment"
                                pageSize={pageSize}
                                category="entertainment"
                                 country="us"
                            />
                        }
                    />
                    <Route
                        path="/health"
                        element={
                            <News
                                key="health"
                                pageSize={pageSize}
                                category="health"
                                 country="us"
                            />
                        }
                    />
                    <Route
                        path="/science"
                        element={
                            <News
                                key="science"
                                pageSize={pageSize}
                                category="science"
                                 country="us"
                            />
                        }
                    />
                    <Route
                        path="/sports"
                        element={
                            <News
                                key="sports"
                                pageSize={pageSize}
                                category="sports"
                                 country="us"
                            />
                        }
                    />
                    <Route
                        path="/technology"
                        element={
                            <News
                                key="technology"
                                pageSize={pageSize}
                                category="technology"
                                 country="us"
                            />
                        }
                    />
                </Routes>
            </Router>
      </div>
    )
  
}
export default App