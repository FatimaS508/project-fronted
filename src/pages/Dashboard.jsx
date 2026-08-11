import { useAuth } from "../context/AuthContext"
import { getAllDomains } from "../services/domainService"
import { getAllGoals } from "../services/goalService";
import { useEffect, useState } from "react";

function Dashboard() {
  const { user } = useAuth();
  const [domains, setDomains] = useState([]);
  const [goals, setGoals] = useState([]); 

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

  useEffect(()=>{
    async function goals(){
      try{
        const response =await getAllGoals()

        console.log("response:", response);
        setGoals(response)
      }catch(err){
        console.log(err)
      }
    }
    goals()
  },[])

  function getDomainProgress(domainName){
    let count =0 //count goals belong to domain
    let sum =0 //total progress value

    for(const goal of goals){
      if(goal.domain?.domainName === domainName) {
        sum+= goal.progress
        count++
      }
    }
    return count === 0 ? 0 : Math.round(sum/ count)
  }

 function getOverallProgress() {
  if (!goals || goals.length === 0) {
    return 0;
  }

  let sum = 0;
  let count = 0;

  for (const goal of goals) {
    if (typeof goal.progress === "number") {
      sum += goal.progress;
      count++;
    }
  }

  return count === 0 ? 0 : Math.round(sum / count);
}


function getOverallFeedback(progress) {
  if (progress === 0) {
    return "You haven't started yet. Set your first goal and begin your journey!";
  }

  if (progress < 50) {
    return "You're making progress, Stay consistent and keep moving forward.";
  }

  if (progress < 100) {
    return "Amazing progress, You're getting closer to achieving your goals.";
  }

  return "Excellent, You've achieved all your goals. Keep up the great work!";
}

function getDomainFeedback(domainName) {
  let totalGoals = 0;
  let completedGoals = 0;

  for (const goal of goals) {
    if (goal.domain?.domainName === domainName) {
      totalGoals++;

      if (goal.progress === 100) {
        completedGoals++;
      }

      
    }
  }
if(totalGoals===0){
        return ""}
  return `You completed ${completedGoals} out of ${totalGoals} goals`;
}



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
         {getOverallProgress()}%
        </div>
        <div class='feedback'><p>{getOverallFeedback(getOverallProgress())}</p></div>
      </div>

      <div className="life-progress-bar">
        <div className="life-progress-fill"></div>
      </div>

      <h1>Your Glow-Up Areas</h1>
      <p>Small steps toward a better you.</p>

      <div className="progress-grid">

        {domains.map((domain) => {
          const progress = getDomainProgress(domain.domainName);

          return (
            <div className="progress-card" key={domain._id}>
              <a href={`/domains/${domain._id}`}>
                <h3>{domain.domainName}</h3>
                <p>{domain.description}</p>
              </a>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                ></div>
              </div>

              <p>{progress}%</p>
               <p>{getDomainFeedback(domain.domainName)}</p>
            </div>
          );
        })}


      </div>

    </div>
  );
}

export default Dashboard;