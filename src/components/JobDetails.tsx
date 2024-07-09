import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks.ts';
import { deleteJob, Job, setOpenEditModal } from '../slices/jobSlice.ts';
import JobForm from './JobForm.tsx';

interface IProps {
  selectedJob: Job;
}

const JobDetails: React.FC<IProps> = ({ selectedJob }) => {
  const dispatch = useAppDispatch();
  const { openEditModal } = useAppSelector((state) => state.jobs);

  const handleEdit = (value: boolean) => {
    dispatch(setOpenEditModal(value));
  };

  return (
    <>
      <Box
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
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}
          >
            <Typography variant='h5' component='h2' gutterBottom>
              {selectedJob.jobTitle}
            </Typography>
            <Box>
              <Button
                variant='contained'
                color='info'
                sx={{ mr: 1 }}
                onClick={() => handleEdit(true)}
                size='small'
              >
                Edit
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={() => dispatch(deleteJob(selectedJob._id))}
                size='small'
              >
                Delete
              </Button>
            </Box>
          </Box>
          <Typography variant='h6' component='h3'>
            Overview:
          </Typography>
          <Typography
            variant='body2'
            component='div'
            dangerouslySetInnerHTML={{ __html: selectedJob.jobOverview }}
            mt={0}
          />
          <Typography variant='h6' component='h3'>
            Responsibilities:
          </Typography>
          <Typography
            variant='body2'
            component='div'
            dangerouslySetInnerHTML={{
              __html: selectedJob.jobResponsibilities,
            }}
          />
          <Typography variant='h6' component='h3'>
            Requirements:
          </Typography>
          <Typography
            variant='body2'
            component='div'
            dangerouslySetInnerHTML={{ __html: selectedJob.jobRequirements }}
            gutterBottom
          />
          <Typography variant='body2'>
            <strong>Level:</strong> {selectedJob.level}
          </Typography>
          <Typography variant='body2'>
            <strong>Shift:</strong> {selectedJob.shift}
          </Typography>
          <Typography variant='body2'>
            <strong>Location:</strong> {selectedJob.location}
          </Typography>
          <Typography variant='body2'>
            <strong>Vacancies:</strong> {selectedJob.vacancies}
          </Typography>
          <Typography variant='body2'>
            <strong>Job Type:</strong> {selectedJob.jobType}
          </Typography>
        </Box>
      </Box>

      <Modal
        open={openEditModal}
        onClose={() => handleEdit(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <JobForm mode='edit' initialData={selectedJob} />
      </Modal>
    </>
  );
};

export default JobDetails;
