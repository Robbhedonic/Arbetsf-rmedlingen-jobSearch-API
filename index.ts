// A function that searches for jobs
// A function that runs our app
// the command to start everything 
const searchJobs = async (keyword: string) => {
    try {
        const result = `https://jobsearch.api.jobtechdev.se/search?q=${keyword}&offset=0&limit=10`;
        const response = await fetch(result);
        const data = await response.json();

        console.log(`\nFound ${data.hits.length} jobs`);
        console.log("-".repeat(50))

        data.hits.forEach((job: any, index: number) => {
            const pubDate = new Date(job.publication_date);

            console.log(`${index + 1}. ${job.headline}`);
            console.log(`Company: ${job.employer.name}`);
            console.log(`Occupation field: ${job.occupation_field.label}`);
            console.log(`Employment type: ${job.employment_type.label}`);
            console.log(`Country: ${job.workplace_address.country}`);
            console.log(`Region: ${job.workplace_address.region}`);
            console.log(`Publication: ${pubDate.toISOString().split("T")[0]}`);
        });
    }
    catch (error){
        console.error(error);
    }
};

const rumApp = () => {
    try{
        console.log("Welcome to the Job Search app "),
        console.log("This app searches for jobs using JobbTeach Api");
        const keyword = "Helsingborg";
        searchJobs(keyword);;
    }
    catch(error){
        console.error(error); 
    }
};

rumApp();