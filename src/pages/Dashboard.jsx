import { useAuth } from "../context/AuthContext"
import { getAllDomains } from "../services/domainService"
import { useEffect, useState } from "react";

function Dashboard() {
  const { user } = useAuth();
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    async function allDomains() {
      try {
        const response = await getAllDomains();
        console.log(response)
        setDomains(response);
      } catch (error) {
        console.error(error);
      }
    }

    allDomains();
  }, []);

  return (
    <div>
      <h1>Welcome {user.username}</h1>

      <div className="life-progress-header">
        <div>
          <h2>Life Progress</h2>
          <p>Track your progress and become your best self</p>
          <p><strong>Your overall progress</strong></p>
        </div>

        <div className="life-progress-percentage">
          0%
        </div>
      </div>

      <div className="life-progress-bar">
        <div className="life-progress-fill"></div>
      </div>

      <h1>Your Glow-Up Areas</h1>
      <p>Small steps toward a better you.</p>

      <div className="progress-grid">

        {domains.map((domain) => (
          <div className="progress-card" key={domain._id}>

            <a href={`/domains/${domain._id}`}>
              <h3>{domain.domainName}</h3>
            </a>

            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>

            <span>0%</span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;