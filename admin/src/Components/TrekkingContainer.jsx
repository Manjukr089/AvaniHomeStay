
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchRooms } from './actions';
import RoomsList from './RoomsList';
import Loading from './Loading';
import { fetchRooms } from '../Redux/actions';
import TrekkingList from './TrekkingList';

export default function TrekkingContainer() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch rooms data from API
    fetch('http://localhost:3001/trekkings')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        return response.json();
      })
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
 

  return (
    <>
      {loading ? (
        <Loading message="Trekking data loading..." />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <TrekkingList rooms={rooms} />
      )}
    </>
  );
}
