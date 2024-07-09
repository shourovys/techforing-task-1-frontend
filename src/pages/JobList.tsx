// src/pages/JobList.tsx
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  List,
  ListItem,
  Modal,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import JobDetails from '../components/JobDetails.tsx';
import JobForm from '../components/JobForm.tsx';
import { Job } from '../contexts/JobContext.tsx';
import {
  fetchJobs,
  setOpenCreateModal,
  setOpenDetailsModal,
  setSelectedJob,
} from '../features/jobSlice.ts';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks.ts';

const JobList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { jobs, selectedJob, openDetailsModal, openCreateModal } =
    useAppSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleOpen = (job: Job) => {
    dispatch(setSelectedJob(job));
  };

  const departmentJobs = jobs.reduce(
    (acc: { [key: string]: Job[] }, job: Job) => {
      const department = job.department.department;
      if (!acc[department]) {
        acc[department] = [];
      }
      acc[department].push(job);
      return acc;
    },
    {}
  );

  const handleClose = () => {
    dispatch(setOpenDetailsModal(false)); // Close details modal
  };

  return (
    <Container sx={{ marginY: 4 }}>
      <Typography variant='h4' component='h1' textAlign='center'>
        BROWSE OPEN POSITIONS BY CATEGORY
      </Typography>
      <Typography
        variant='body1'
        component='p'
        marginBottom={2}
        textAlign='center'
      >
        We are always on the lookout for talented people
      </Typography>
      {Object.entries(departmentJobs).map(([department, jobs]) => (
        <Accordion
          key={department}
          sx={{
            marginBottom: 2,
            border: '1.6px solid #ACACAC',
            borderRadius: 1,
            backgroundColor: '#F5F5F5',
            boxShadow: '0',
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant='h6'
              component='h2'
              sx={{ fontWeight: '600', color: '#626262' }}
            >
              {department}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {jobs.map((job) => (
                <ListItem
                  key={job._id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    bgcolor: '#fff',
                    marginBottom: 1,
                  }}
                >
                  <Typography
                    variant='h6'
                    component='span'
                    onClick={() => handleOpen(job)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {job.jobTitle}
                  </Typography>
                  <Button
                    onClick={() => handleOpen(job)}
                    variant='contained'
                    color='primary'
                  >
                    Details
                  </Button>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Button
          variant='outlined'
          color='primary'
          onClick={() => dispatch(setOpenCreateModal(true))}
        >
          Create Job
        </Button>
      </Box>
      {selectedJob && (
        <Modal
          open={openDetailsModal}
          onClose={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <JobDetails selectedJob={selectedJob} />
        </Modal>
      )}
      <Modal
        open={openCreateModal}
        onClose={() => dispatch(setOpenCreateModal(false))}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <JobForm mode='create' />
      </Modal>
    </Container>
  );
};

export default JobList;
