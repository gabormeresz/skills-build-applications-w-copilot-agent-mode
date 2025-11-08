import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard - Fetching from API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        console.log('Leaderboard - Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard - Processed data:', leaderboardData);
        setLeaderboard(leaderboardData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Leaderboard - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getRankBadgeClass = (rank) => {
    if (rank === 1) return 'rank-badge rank-1';
    if (rank === 2) return 'rank-badge rank-2';
    if (rank === 3) return 'rank-badge rank-3';
    return 'rank-badge rank-other';
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading leaderboard...</p>
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
            Error Loading Leaderboard
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
            <i className="bi bi-trophy-fill me-2"></i>
            Leaderboard
          </h1>
          <p className="text-muted">
            Top performers ranked by total points
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col" style={{width: '80px'}}>Rank</th>
                  <th scope="col">User</th>
                  <th scope="col">Total Points</th>
                  <th scope="col">Activities Completed</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                      No leaderboard data available
                    </td>
                  </tr>
                ) : (
                  leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    return (
                      <tr key={entry.id || index}>
                        <td>
                          <div className={getRankBadgeClass(rank)}>
                            {getRankIcon(rank)}
                          </div>
                        </td>
                        <td>
                          <strong className="fs-6">
                            {entry.user_name || entry.user}
                          </strong>
                        </td>
                        <td>
                          <span className="badge bg-success fs-6">
                            ⭐ {entry.total_points} pts
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-info text-dark fs-6">
                            <i className="bi bi-check-circle-fill me-1"></i>
                            {entry.activities_count} {entry.activities_count === 1 ? 'activity' : 'activities'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {leaderboard.length > 0 && (
        <div className="row mt-4">
          <div className="col">
            <div className="alert alert-info" role="alert">
              <i className="bi bi-info-circle-fill me-2"></i>
              <strong>Keep pushing!</strong> Complete more activities to climb the leaderboard.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
