import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeItem = (id) => {
    const items = tours.filter((tour) => {
      return tour.id !== id;
    });
    setTours(items);
  };

  const fetchTour = async () => {
    try {
      const res = await fetch(url);
      const tours = await res.json();
      setTours(tours);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTour();
  }, []);
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={() => fetchTour()}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeItem={removeItem} />
    </main>
  );
}

export default App;
