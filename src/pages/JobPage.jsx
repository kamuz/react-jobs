import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const JobPage = () => {
  const {id} = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, []);


  return (
    <div>
      {loading ? <Spinner /> : (
          <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h1 className="text-3xl font-bold">{job.title}</h1>
                <div>{job.description}</div>
                {console.log(job)}
            </div>
          </section>
        )
      }
    </div>
  );
}

export default JobPage;