import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createJob, IFormInput, Job, updateJob } from '../features/jobSlice.ts';
import { useAppDispatch } from '../hooks/reduxHooks.ts';

const departments = [
  { id: 1, department: 'Digital Marketing' },
  { id: 2, department: 'HR & Administration' },
  { id: 3, department: 'Management' },
  { id: 4, department: 'Engineering' },
  { id: 5, department: 'Creative' },
  { id: 6, department: 'Sales & Marketing' },
  { id: 7, department: 'Accounts' },
  { id: 8, department: 'Development' },
];

interface JobFormProps {
  initialData?: Job;
  mode: 'create' | 'edit';
}

const JobForm: React.FC<JobFormProps> = ({ initialData, mode }) => {
  const dispatch = useAppDispatch();
  const { _id, department, ...rest } = initialData || {};
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<
    IFormInput & {
      department: string;
    }
  >({
    defaultValues: _id
      ? { ...rest, department: department?.department as string }
      : {
          jobTitle: '',
          company: '',
          coordinator: '',
          level: '',
          shift: '',
          location: '',
          vacancies: 1,
          jobType: '',
          jobOverview: '',
          jobResponsibilities: '',
          jobRequirements: '',
          department: departments[0].department,
        },
  });

  const onSubmit = async (data: IFormInput) => {
    const selectedDepartment = departments.find(
      (dept) => dept.department === data.department?.toString()
    );
    console.log('🚀 ~ onSubmit ~ selectedDepartment:', selectedDepartment);
    const newJob: IFormInput = {
      ...data,
      userId: '',
      department: selectedDepartment
        ? {
            id: selectedDepartment.id,
            department: selectedDepartment.department,
          }
        : departments[0],
    };

    if (mode === 'create') {
      await dispatch(createJob(newJob));
    } else {
      await dispatch(updateJob({ id: _id as string, job: newJob }));
    }

    reset();
  };

  return (
    <Box
      maxWidth='sm'
      sx={{
        border: '2px solid #000',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          maxWidth: '90vw',
          maxHeight: '80vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          overflow: 'auto',
          p: 4,
        }}
      >
        <Typography variant='h4' component='h1' textAlign={'center'}>
          {mode === 'create' ? 'Create Job' : 'Edit Job'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='jobTitle'
            control={control}
            rules={{ required: 'Job Title is required' }}
            render={({ field }) => (
              <TextField
                label='Job Title'
                fullWidth
                margin='normal'
                size='small'
                error={!!errors.jobTitle}
                helperText={errors.jobTitle ? errors.jobTitle.message : ''}
                {...field}
              />
            )}
          />
          <Controller
            name='company'
            control={control}
            rules={{ required: 'Company is required' }}
            render={({ field }) => (
              <TextField
                label='Company'
                fullWidth
                margin='normal'
                size='small'
                error={!!errors.company}
                helperText={errors.company ? errors.company.message : ''}
                {...field}
              />
            )}
          />
          <Controller
            name='coordinator'
            control={control}
            rules={{ required: 'Coordinator is required' }}
            render={({ field }) => (
              <TextField
                label='Coordinator'
                fullWidth
                margin='normal'
                size='small'
                error={!!errors.coordinator}
                helperText={
                  errors.coordinator ? errors.coordinator.message : ''
                }
                {...field}
              />
            )}
          />
          <Controller
            name='level'
            control={control}
            rules={{ required: 'Level is required' }}
            render={({ field }) => (
              <TextField
                label='Level'
                fullWidth
                margin='normal'
                size='small'
                error={!!errors.level}
                helperText={errors.level ? errors.level.message : ''}
                {...field}
              />
            )}
          />
          <Controller
            name='shift'
            control={control}
            rules={{ required: 'Shift is required' }}
            render={({ field }) => (
              <TextField
                label='Shift'
                fullWidth
                margin='normal'
                size='small'
                error={!!errors.shift}
                helperText={errors.shift ? errors.shift.message : ''}
                {...field}
              />
            )}
          />
          <Controller
            name='location'
            control={control}
            rules={{ required: 'Location is required' }}
            render={({ field }) => (
              <TextField
                label='Location'
                fullWidth
                margin='normal'
                size='small'
                error={!!errors.location}
                helperText={errors.location ? errors.location.message : ''}
                {...field}
              />
            )}
          />
          <Controller
            name='vacancies'
            control={control}
            rules={{ required: 'Vacancies is required', min: 1 }}
            render={({ field }) => (
              <TextField
                label='Vacancies'
                type='number'
                fullWidth
                margin='normal'
                size='small'
                error={!!errors.vacancies}
                helperText={errors.vacancies ? errors.vacancies.message : ''}
                {...field}
              />
            )}
          />
          <Controller
            name='jobType'
            control={control}
            rules={{ required: 'Job Type is required' }}
            render={({ field }) => (
              <TextField
                label='Job Type'
                fullWidth
                margin='normal'
                size='small'
                error={!!errors.jobType}
                helperText={errors.jobType ? errors.jobType.message : ''}
                {...field}
              />
            )}
          />
          <Typography variant='body2' component='p' gutterBottom>
            Job Overview
          </Typography>
          <Controller
            name='jobOverview'
            control={control}
            rules={{ required: 'Job Overview is required' }}
            render={({ field }) => (
              <ReactQuill
                value={field.value}
                onChange={field.onChange}
                theme='snow'
                style={{ marginBottom: '1rem' }}
              />
            )}
          />
          <Typography variant='body2' component='p' gutterBottom>
            Job Responsibilities
          </Typography>
          <Controller
            name='jobResponsibilities'
            control={control}
            rules={{ required: 'Job Responsibilities is required' }}
            render={({ field }) => (
              <ReactQuill
                value={field.value}
                onChange={field.onChange}
                theme='snow'
                style={{ marginBottom: '1rem' }}
              />
            )}
          />
          <Typography variant='body2' component='p' gutterBottom>
            Job Requirements
          </Typography>
          <Controller
            name='jobRequirements'
            control={control}
            rules={{ required: 'Job Requirements is required' }}
            render={({ field }) => (
              <ReactQuill
                value={field.value}
                onChange={field.onChange}
                theme='snow'
                style={{ marginBottom: '1rem' }}
              />
            )}
          />
          <Controller
            name='department'
            control={control}
            rules={{ required: 'Department is required' }}
            render={({ field }) => (
              <FormControl fullWidth margin='normal' size='small'>
                <InputLabel>Department</InputLabel>
                <Select
                  label='Department'
                  {...field}
                  error={!!errors.department}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.id} value={dept.department}>
                      {dept.department}
                    </MenuItem>
                  ))}
                </Select>
                {errors.department && (
                  <Typography color='error'>
                    {errors.department.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
          <Button type='submit' variant='contained' color='primary' fullWidth>
            {mode === 'create' ? 'Create Job' : 'Update Job'}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default JobForm;
