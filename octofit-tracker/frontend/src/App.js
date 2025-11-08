import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit Logo" />
              OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    <i className="bi bi-people-fill me-1"></i>
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    <i className="bi bi-activity me-1"></i>
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    <i className="bi bi-people me-1"></i>
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    <i className="bi bi-trophy-fill me-1"></i>
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    <i className="bi bi-lightning-charge-fill me-1"></i>
                    Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div>
              <div className="hero-section">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 mx-auto text-center">
                      <h1>
                        <i className="bi bi-heart-pulse-fill me-3"></i>
                        Welcome to OctoFit Tracker
                      </h1>
                      <p className="lead">
                        Track your fitness activities, compete with your team, and reach your fitness goals!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container mt-5">
                <div className="row g-4">
                  <div className="col-md-6 col-lg-3">
                    <Link to="/activities" className="text-decoration-none">
                      <div className="card text-center">
                        <div className="card-body">
                          <i className="bi bi-activity text-primary fs-1 mb-3 d-block"></i>
                          <h5 className="card-title">Track Activities</h5>
                          <p className="card-text text-muted">
                            Log your workouts and monitor your progress
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="col-md-6 col-lg-3">
                    <Link to="/teams" className="text-decoration-none">
                      <div className="card text-center">
                        <div className="card-body">
                          <i className="bi bi-people text-primary fs-1 mb-3 d-block"></i>
                          <h5 className="card-title">Join Teams</h5>
                          <p className="card-text text-muted">
                            Collaborate with others and achieve together
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="col-md-6 col-lg-3">
                    <Link to="/leaderboard" className="text-decoration-none">
                      <div className="card text-center">
                        <div className="card-body">
                          <i className="bi bi-trophy-fill text-warning fs-1 mb-3 d-block"></i>
                          <h5 className="card-title">Leaderboard</h5>
                          <p className="card-text text-muted">
                            Compete and see how you rank against others
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="col-md-6 col-lg-3">
                    <Link to="/workouts" className="text-decoration-none">
                      <div className="card text-center">
                        <div className="card-body">
                          <i className="bi bi-lightning-charge-fill text-primary fs-1 mb-3 d-block"></i>
                          <h5 className="card-title">Get Workouts</h5>
                          <p className="card-text text-muted">
                            Personalized workout recommendations for you
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="row mt-5">
                  <div className="col-lg-8 mx-auto">
                    <div className="card bg-light">
                      <div className="card-body text-center p-5">
                        <h3 className="mb-3">Ready to Start Your Fitness Journey?</h3>
                        <p className="text-muted mb-4">
                          Join thousands of users already tracking their fitness progress with OctoFit Tracker
                        </p>
                        <div className="d-flex gap-3 justify-content-center">
                          <Link to="/activities" className="btn btn-primary btn-lg">
                            <i className="bi bi-plus-circle-fill me-2"></i>
                            Log Activity
                          </Link>
                          <Link to="/workouts" className="btn btn-outline-primary btn-lg">
                            <i className="bi bi-search me-2"></i>
                            Browse Workouts
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>

        <footer className="mt-5 py-4 bg-light border-top">
          <div className="container">
            <div className="row">
              <div className="col text-center text-muted">
                <p className="mb-0">
                  <i className="bi bi-heart-fill text-danger me-2"></i>
                  Built with OctoFit Tracker &copy; 2025
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

