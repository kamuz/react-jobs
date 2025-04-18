import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({isHome = false}) => {

  // State for storing job listings, initialized as an empty array
  const [jobs, setJobs] = useState([]);

  // State for loading indicator
  const [loading, setLoading] = useState(true);

  // Fetch job listings from the server when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {

      // Conditional fetching for home and other pages
      const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs';

      try {
        // Sending request to the API endpoint
        const res = await fetch(apiUrl);
        // Parsing response as JSON
        const data = await res.json();
        // Updating the state with the fetched job listings
        setJobs(data);
      } catch (error) {
        // Logging error in case of request failure
        console.log('Error fetching data', error);
      } finally {
        // Setting loading to false if success or failure
        setLoading(false);
      }
    };

    // Calling the function to fetch jobs
    fetchJobs();

  // Empty dependency array ensures this effect runs only once (on mount)
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">{isHome ? 'Recent Jobs' : 'Browse Jobs'}</h2>
          {
            loading
            ? <Spinner loading={loading} />
            : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobListing key={ job.id } job={ job }/>
                ))}
              </div>
            )
          }
      </div>
    </section>
  );
}

export default  JobListings;