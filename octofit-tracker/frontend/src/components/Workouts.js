import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts - Fetching from API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        console.log('Workouts - Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts - Processed data:', workoutsData);
        setWorkouts(workoutsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Workouts - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      'Beginner': 'badge bg-success',
      'Intermediate': 'badge bg-warning text-dark',
      'Advanced': 'badge bg-danger',
      'Expert': 'badge bg-dark'
    };
    return badges[difficulty] || 'badge bg-secondary';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Cardio': '❤️',
      'Strength': '💪',
      'Flexibility': '🧘',
      'HIIT': '⚡',
      'Endurance': '🏃',
      'Balance': '⚖️'
    };
    return icons[category] || '🎯';
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading workouts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Error Loading Workouts
          </h4>
          <p className="mb-0">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4 px-4">
      <div className="row mb-4">
        <div className="col">
          <h1 className="section-title">
            <i className="bi bi-lightning-charge-fill me-2"></i>
            Suggested Workouts
          </h1>
          <p className="text-muted">
            {workouts.length} personalized {workouts.length === 1 ? 'workout' : 'workouts'} for you
          </p>
        </div>
      </div>

      <div className="row g-4">
        {workouts.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info" role="alert">
              <i className="bi bi-info-circle-fill me-2"></i>
              No workout suggestions available. Check back later for personalized recommendations!
            </div>
          </div>
        ) : (
          workouts.map(workout => (
            <div key={workout.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title mb-0">
                      {getCategoryIcon(workout.category)} {workout.name}
                    </h5>
                    <span className={getDifficultyBadge(workout.difficulty)}>
                      {workout.difficulty}
                    </span>
                  </div>
                  
                  <h6 className="card-subtitle mb-3 text-muted text-uppercase">
                    <i className="bi bi-bookmark-fill me-1"></i>
                    {workout.category}
                  </h6>
                  
                  <p className="card-text flex-grow-1">
                    {workout.description || 'No description available'}
                  </p>
                  
                  <div className="mt-3 pt-3 border-top">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <small className="text-muted">
                        <i className="bi bi-clock-fill me-1"></i>
                        <strong>{workout.duration} minutes</strong>
                      </small>
                      <small className="text-muted">
                        <i className="bi bi-fire me-1"></i>
                        ID: {workout.id}
                      </small>
                    </div>
                    
                    <button className="btn btn-primary w-100">
                      <i className="bi bi-play-circle-fill me-2"></i>
                      Start Workout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Workouts;
