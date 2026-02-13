// Src/models.ts
export interface Job {
  headline: string;
  employer: { name: string };
  occupation_field: { label: string };
  employment_type: { label: string };
  workplace_address: { country: string; region: string };
  publication_date: string;
}

export interface JobSearchResponse {
  hits: Job[];
}
