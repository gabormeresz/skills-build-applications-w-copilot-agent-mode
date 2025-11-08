import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Teams - Fetching from API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        console.log('Teams - Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Teams - Processed data:', teamsData);
        setTeams(teamsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Teams - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading teams...</p>
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
            Error Loading Teams
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
            <i className="bi bi-people me-2"></i>
            Teams
          </h1>
          <p className="text-muted">
            {teams.length} {teams.length === 1 ? 'team' : 'teams'} available
          </p>
        </div>
      </div>

      <div className="row g-4">
        {teams.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info" role="alert">
              <i className="bi bi-info-circle-fill me-2"></i>
              No teams found. Create a team to get started!
            </div>
          </div>
        ) : (
          teams.map(team => (
            <div key={team.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title mb-0">
                      <i className="bi bi-shield-fill-check me-2 text-primary"></i>
                      {team.name}
                    </h5>
                    <span className="badge bg-primary rounded-pill">
                      {team.members_count || 0}
                      <i className="bi bi-person-fill ms-1"></i>
                    </span>
                  </div>
                  <p className="card-text flex-grow-1 text-muted">
                    {team.description || 'No description available'}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                    <small className="text-muted">
                      <i className="bi bi-calendar-event me-1"></i>
                      Team ID: {team.id}
                    </small>
                    <button className="btn btn-sm btn-outline-primary">
                      View Details
                      <i className="bi bi-arrow-right ms-1"></i>
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

export default Teams;
