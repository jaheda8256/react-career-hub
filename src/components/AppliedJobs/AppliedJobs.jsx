import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getStoredJobApplication } from "../../utility/localstoage";


const AppliedJobs = () => {
    const jobs = useLoaderData();
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [displayJobs, setDisplayJobs] = useState([]);

    const handleJobsFilter = filter =>{
        if(filter === 'all'){
            setDisplayJobs(appliedJobs);
        }
        else if(filter === 'remote') {
            const remoteJobs = appliedJobs.filter(job => job.remote_or_onsite === 'Remote');
            setDisplayJobs(remoteJobs);
        }
        else if(filter === 'Onsite'){
            const onsiteJobs = appliedJobs.filter(job => job.remote_or_onsite === 'Remote');
            setDisplayJobs(onsiteJobs);
        }
    }

    useEffect(() =>{
        const storedJobIds = getStoredJobApplication();
        if(jobs.length > 0){


            // const jobsApplied = jobs.filter(job => storedJobIds.includes(job.id));

            const jobsApplied = [];
            for(const id of storedJobIds){
                const job = jobs.find(job => job.id === id);
                if(job){
                    jobsApplied.push(job)
                }
            }
            setAppliedJobs(jobsApplied);
            setDisplayJobs(jobsApplied);
            
        }

    }, [jobs])
    return (
        <div>
            <h2 className="text-2xl"> jobs I applied: {appliedJobs.length}</h2>
            <details className="dropdown">
  <summary className="m-1 btn">open or close</summary>
  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
    <li onClick={() => handleJobsFilter('all')}><a>All</a></li>
    <li onClick={() => handleJobsFilter('Remote')}><a>Remote</a></li>
    <li onClick={() => handleJobsFilter('Onsite')}><a>onsite</a></li>
  </ul>
</details>
            <ul>
            {
                displayJobs.map(job => <li key={job.id}><span>{job.job_title} {job.company_name}: {job.remote_or_onsite}</span></li>)
            }
            </ul>
        </div>
    );
};

export default AppliedJobs;