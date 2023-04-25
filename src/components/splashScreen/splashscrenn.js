import React, { useState, useEffect } from 'react';
import splash from './splash';
const Splashscreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <splash/>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Splashscreen;
