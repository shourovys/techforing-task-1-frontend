import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../api/index.ts';

export interface Job {
  _id: string;
  company: string;
  userId: string;
  coordinator: string;
  jobTitle: string;
  level: string;
  shift: string;
  location: string;
  vacancies: number;
  jobType: string;
  jobOverview: string;
  jobResponsibilities: string;
  jobRequirements: string;
  department: {
    id: number;
    department: string;
  };
}

export type IFormInput = Omit<Job, '_id'>;

interface JobState {
  jobs: Job[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedJob: Job | null;
  openDetailsModal: boolean;
  openCreateModal: boolean;
  openEditModal: boolean;
}

const initialState: JobState = {
  jobs: [],
  status: 'idle',
  error: null,
  selectedJob: null,
  openDetailsModal: false,
  openCreateModal: false,
  openEditModal: false,
};

export const fetchJobs = createAsyncThunk('jobs/fetch', async () => {
  const response = await axiosInstance.get('/jobs');
  return response.data;
});

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (job: IFormInput) => {
    const response = await axiosInstance.post('/jobs', job);
    return response.data;
  }
);

export const deleteJob = createAsyncThunk('jobs/delete', async (id: string) => {
  await axiosInstance.delete(`/jobs/${id}`);
  return id;
});

export const updateJob = createAsyncThunk(
  'jobs/update',
  async ({ id, job }: { id: string; job: IFormInput }) => {
    const response = await axiosInstance.put(`/jobs/${id}`, job);
    return response.data;
  }
);

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setSelectedJob(state, action: PayloadAction<Job | null>) {
      state.selectedJob = action.payload;
      state.openDetailsModal = true;
    },
    setOpenDetailsModal(state, action: PayloadAction<boolean>) {
      state.openDetailsModal = action.payload;
    },
    setOpenCreateModal(state, action: PayloadAction<boolean>) {
      state.openCreateModal = action.payload;
    },
    setOpenEditModal(state, action: PayloadAction<boolean>) {
      state.openEditModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(createJob.fulfilled, (state, action: PayloadAction<Job>) => {
        state.jobs.push(action.payload);
        state.openCreateModal = false;
      })
      .addCase(deleteJob.fulfilled, (state, action: PayloadAction<string>) => {
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
        state.openDetailsModal = false;
      })
      .addCase(updateJob.fulfilled, (state, action: PayloadAction<Job>) => {
        const index = state.jobs.findIndex(
          (job) => job._id === action.payload._id
        );
        if (index >= 0) {
          state.jobs[index] = action.payload;
        }
        state.openEditModal = false;
      });
  },
});

export const {
  setSelectedJob,
  setOpenDetailsModal,
  setOpenCreateModal,
  setOpenEditModal,
} = jobSlice.actions;

export default jobSlice.reducer;
