'use client';

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function Header() {
  return (
    <AppBar color="transparent" elevation={0} position="static">
      <Toolbar className="justify-between px-0">
        <Typography variant="h6" component={Link} href="/" className="font-semibold text-brand-600">
          PulsePilot
        </Typography>
        <div className="space-x-3">
          <Button component={Link} href="/dashboard" variant="text">
            Dashboard
          </Button>
          <Button component={Link} href="/submit" variant="contained">
            Submit Feedback
          </Button>
           <Button component={Link} href="/form" variant="contained">
            Submit URL
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
