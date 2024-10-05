import React, { useEffect, useState } from 'react';
import './Requestpage.css'; // Import the CSS file

const Requestpage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/forms/my-request', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }

        const data = await response.json();

        if (data.requests && Array.isArray(data.requests)) {
          setRequests(data.requests);
        } else {
          console.error("Expected 'requests' to be an array but got:", data);
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch requests');
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 style={{ fontWeight: 'bold', color: 'blue' }}>My Requests</h1>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {requests.map((request, index) => (
            <li key={request._id} className="request-item">
              <h3>Request #{index + 1}</h3>
              <strong>Category:</strong> {request.category} <br />
              <strong>Description:</strong> {request.description} <br />
              <strong>To Serve:</strong> {request.toServe} <br />
              <strong>Address:</strong> {request.addressTo.street}, {request.addressTo.city}, {request.addressTo.state}, {request.addressTo.postalcode}, {request.addressTo.country} <br />
              <strong>Date:</strong> {new Date(request.date).toLocaleString()} <br />
              <strong>Status:</strong> {request.completed ? "Fulfilled" : "Pending"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Requestpage;
