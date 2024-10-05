import React, { useEffect, useState } from 'react';
import './Requestpage.css'; // Import CSS if needed

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/forms/my-donation', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch donations');
        }

        const data = await response.json();
        // console.log(data);
        if (data.donations && Array.isArray(data.donations)) {
          setDonations(data.donations);
        } else {
          console.error("Expected 'donations' to be an array but got:", data);
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch donations');
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 style={{ fontWeight: 'bold', color: 'blue' }}>My Donations</h1>
      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {donations.map((donation, index) => (
            <li key={donation._id} className="request-item">
             {console.log(donation)}
              <h3>Donation #{index + 1}</h3>
              <strong>Item:</strong> {donation.description} <br />
              <strong>Quantity:</strong> {donation.serves} <br />
              <strong>Address From:</strong> {donation.addressFrom.street}, {donation.addressFrom.city}, {donation.addressFrom.state}, {donation.addressFrom.postalcode}, {donation.addressFrom.country} <br />
              <strong>Date:</strong> {new Date(donation.date).toLocaleString()} <br />
              <strong>Status:</strong> {donation.completed ? "Completed" : "Pending"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyDonations;
