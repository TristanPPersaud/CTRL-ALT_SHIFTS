//TO DO: Add in path to pull employee name for welcome message
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Employer() {
    const { company_id } = useParams();
    const [employee_name, setEmployeeName] = useState("Employer");
    
    useEffect(() => {
      // Try to get user info
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const userData = JSON.parse(user);
          setEmployeeName(userData.first_name || "Employer");
        } catch (err) {
          console.error('Error parsing user data', err);
        }
      }
    }, []);

    return (
        <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <p className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-slate-950 sm:text-5xl">
            Welcome {employee_name}!
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
            <div className="relative lg:col-span-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                <div className="p-10 pt-4">
                    <Link to={`/${company_id}/schedule/new`} className="rounded-md bg-lime-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-slate-500 inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">
                        Create Schedule
                    </Link>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            </div>
            <div className="relative lg:col-span-3">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
                <div className="p-10 pt-4">
                    <Link to={`/${company_id}/schedule`} className="rounded-md bg-slate-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-lime-500 inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">
                        View Schedule
                    </Link>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-tr-[2rem]" />
            </div>
            <div className="relative lg:col-span-3">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-bl-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
                <div className="p-10 pt-4">
                    <Link to={`/${company_id}/employees`} className="rounded-md bg-slate-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-lime-500 inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">
                        View Employees
                    </Link>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-bl-[2rem]" />
            </div>
            <div className="relative lg:col-span-3">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="p-10 pt-4">
                    <Link to={`/${company_id}/jobs`} className="rounded-md bg-slate-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-lime-500 inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">
                        View Jobs
                    </Link>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Employer;