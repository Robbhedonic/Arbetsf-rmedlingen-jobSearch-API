import { JobSearchResponse, Job } from './models.js';

const searchJobs = async (profession: string, city: string) => {
  try {
    const query = `${profession} in ${city}`;
    const url = `https://jobsearch.api.jobtechdev.se/search?q=${encodeURIComponent(query)}&offset=0&limit=10`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = (await response.json()) as JobSearchResponse;

    if (!data.hits.length) {
      console.log(`No jobs found for "${query}"`);
      return;
    }

    console.log(`\nFound ${data.hits.length} jobs for "${query}"`);
    console.log('-'.repeat(50));

    data.hits.forEach((job: Job, index: number) => {
      const pubDate = new Date(job.publication_date);
      //Note toISOString() returns the date in standard UTC format: 2026-02-14T00:00:00.000Z
      //Note toString() returns the date in a human-readable format using the local time zone
      console.log(pubDate.toISOString());
      console.log(pubDate.toString());

      console.log(`${index + 1}. ${job.headline}`);
      console.dir(job, { depth: 2 });
      console.log(`Company: ${job.employer.name}`);
      console.log(`Occupation field: ${job.occupation_field.label}`);
      console.log(`Employment type: ${job.employment_type.label}`);
      console.log(`Country: ${job.workplace_address.country}`);
      console.log(`Region: ${job.workplace_address.region}`);
      console.log(`Publication: ${pubDate.toISOString().split('T')[0]}`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('An error occurred while fetching jobs:');
      console.error(error.message);
      console.dir(error, { depth: 2 });
    } else {
      console.error('An unexpected non-error was thrown:');
      console.dir(error, { depth: 2 });
    }
  } // <- ESTE ES EL cierre correcto del catch
};

const runApp = async () => {
  try {
    console.log('Welcome to the Job Search app ');
    console.log('This app searches for jobs using JobbTeach Api');
    await searchJobs('Software Developer', 'Malmö');
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  await runApp();
};

main().catch((err) => console.error(err));
