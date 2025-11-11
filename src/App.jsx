import React, { useState, useMemo } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Box,
  useMediaQuery,
  styled,
  Card,
  Chip
} from '@mui/material';
import { Fab, Fade, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Components
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Summary from './components/sections/Summary';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';

// MUI Theme
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#3f51b5',
            light: '#757de8',
            dark: '#002984',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#f50057',
            light: '#ff4081',
            dark: '#c51162',
            contrastText: '#ffffff',
          },
          background: {
            default: '#f8f9fa',
            paper: '#ffffff',
          },
          text: {
            primary: '#212529',
            secondary: '#495057',
          },
        }
      : {
          primary: {
            main: '#7986cb',
            light: '#aab6fe',
            dark: '#49599a',
            contrastText: '#000000',
          },
          secondary: {
            main: '#f48fb1',
            light: '#ffc1e3',
            dark: '#bf5f82',
            contrastText: '#000000',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#e9ecef',
            secondary: '#adb5bd',
          },
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      marginBottom: '1.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      marginBottom: '1.5rem',
      position: 'relative',
      display: 'inline-block',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: '-10px',
        left: 0,
        width: '60px',
        height: '4px',
        backgroundColor: 'primary.main',
        borderRadius: '2px',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.8rem',
      marginBottom: '1rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      marginBottom: '0.75rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      marginBottom: '0.5rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.1rem',
      marginBottom: '0.5rem',
    },
    subtitle1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
      color: 'text.secondary',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.8,
    },
    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.7,
      color: 'text.secondary',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontWeight: 600,
          letterSpacing: '0.5px',
          textTransform: 'none',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundImage: 'none',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'transparent',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const Section = styled('section')(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  fontWeight: 500,
}));

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const skills = {
    cloud: ['AWS (EC2, S3, VPC, Route53, Lambda, MWAA, Glue, IAM)', 'Azure (AKS, ACR, AAD, DevOps, Artifacts)'],
    containers: ['Openshift', 'Kubernetes (EKS, AKS)', 'Helm', 'Rancher', 'Docker', 'Docker Swarm'],
    cicd: ['Terraform', 'CloudFormation', 'Ansible', 'YAML', 'JSON', 'Jenkins', 'Azure DevOps', 'GitLab CI/CD'],
    monitoring: ['ELK/OpenSearch', 'CloudWatch', 'Grafana', 'Prometheus', 'Jaeger'],
    programming: ['Python (FastAPI, Flask, Pandas, etc.)', 'Shell', 'Bash', 'SQL', 'HTML', 'CSS', 'JavaScript'],
    ai: ['RAG pipelines', 'Embeddings', 'Vector DBs', 'MCPs', 'LangChain/LangGraph', 'OpenSearch vector search'],
    collaboration: ['Git', 'Bitbucket', 'Jira', 'ServiceNow'],
    os: ['Linux (CentOS, Ubuntu, RHEL)', 'UNIX', 'Windows']
  };

  const experiences = [
    {
      company: 'TIAA (via Cognizant)',
      position: 'Sr. Cloud DevOps Engineer',
      duration: 'May 2023 – Present',
      highlights: [
        'Automated AWS infra with Terraform for 100+ workloads, reducing manual effort 70%',
        'Migrated Airflow → AWS MWAA, cutting operational overhead 30%',
        'Implemented ELK/OpenSearch dashboards with ISM/ILM policies, reducing MTTR 44%',
        'Converted 200+ CloudFormation templates → Terraform modules',
        'Built AI-powered semantic search using OpenSearch + embeddings',
        'Developed "VFix" AI agent for auto-remediating AWS vulnerabilities'
      ]
    },
    {
      company: 'Amdocs (via Sai Global Solutions)',
      position: 'Sr. Cloud DevOps Engineer',
      duration: 'Feb 2022 – May 2023',
      highlights: [
        'Deployed AKS clusters with Terraform, scaling to 1M+ daily transactions',
        'Automated CI/CD pipelines with Azure DevOps, reducing release cycle time 60%',
        'Integrated ELK + Jaeger for distributed tracing, improving resolution speed 35%',
        'Implemented Rancher for multi-cluster management, achieving 99.9% uptime',
        'Containerized 5G apps with Helm & Ansible'
      ]
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar mode={mode} toggleColorMode={toggleColorMode} />
      
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, sm: 3 }, pt: { xs: 8, sm: 10 } }}>
        <Hero />
        <Summary />
        <Skills skills={skills} />
        <Experience experiences={experiences} />
        <Education />
        <Projects />
        
        <ScrollTop>
          <Fab color="primary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Box>
    </ThemeProvider>
  );
};

export default App;
