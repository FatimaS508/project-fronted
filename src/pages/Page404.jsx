import React, { useEffect } from 'react';

function Page404() {
  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

export default Page404;
