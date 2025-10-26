import {Container, Paper, Typography} from '@mui/material';
import Header from '@/src/components/Header';
import UrlForm from '@/src/components/forms/UrlForm';

export default function FormPage(){
  return <Container maxWidth="sm" className="space-y-8 py-12">
    <Header/>
    <Paper elevation={0} className="space-y-4 rounded-2xl border border-slate-200 p-8">
       <Typography variant="h4">Submit URL</Typography>
       <UrlForm/>
    </Paper>
  </Container>
}