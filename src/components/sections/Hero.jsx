import React, { useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, useTheme, useMediaQuery, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-scroll';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <Box 
      id="home"
      ref={ref}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 15, md: 0 },
        pb: 8,
        background: theme.palette.mode === 'dark' 
          ? 'radial-gradient(circle at 10% 20%, #1a1a2e 0%, #16213e 90%)' 
          : 'radial-gradient(circle at 10% 20%, #f8f9ff 0%, #eef2ff 90%)',
      }}
    >
      {/* Animated background elements */}
      <Box 
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.5 }}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%239C92AC\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          opacity: 0.5,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid 
          container 
          spacing={4} 
          alignItems="center"
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  mb: 1,
                  display: 'inline-block',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: '60px',
                    height: '2px',
                    backgroundColor: 'primary.main',
                    bottom: '-5px',
                    left: 0,
                  },
                }}
              >
                Hello, I'm
              </Typography>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                }}
              >
                Bharath Reddy
              </Typography>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h2" 
                component="h2" 
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: 'text.primary',
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                  lineHeight: 1.2,
                }}
              >
                Cloud & DevOps Engineer
              </Typography>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Typography 
                variant="subtitle1" 
                sx={{
                  mb: 4,
                  maxWidth: '600px',
                  color: 'text.secondary',
                  lineHeight: 1.7,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                }}
              >
                I design and implement cloud-native solutions that are scalable, secure, and efficient. 
                Passionate about automation, infrastructure as code, and building robust CI/CD pipelines.
              </Typography>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                    <Box component="span" sx={{ mr: 1 }}>📧</Box>
                    <a href="mailto:bharathreddy0922@gmail.com" style={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>bharathreddy0922@gmail.com</a>
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                    <Box component="span" sx={{ mr: 1 }}>📱</Box>
                    <a href="tel:+19802251696" style={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>980-225-1696</a>
                  </Typography>
                </Box>
              </Box>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    size="large"
                    component={Link}
                    to="experience"
                    smooth={true}
                    duration={500}
                    offset={-70}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: 'none',
                      borderWidth: '2px',
                      '&:hover': {
                        borderWidth: '2px',
                        transform: 'translateY(-2px)',
                        backgroundColor: 'transparent',
                        color: 'primary.main',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    View My Work
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    component="a"
                    href="/Bharath_Italapur_CV/Bharath-Resume.pdf"
                    download="Bharath-Resume.pdf"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: `0 4px 14px ${theme.palette.primary.main}40`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 6px 20px ${theme.palette.primary.main}60`,
                        backgroundColor: theme.palette.primary.dark,
                      },
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                    }}
                  >
                    Download Resume
                  </Button>
                </Box>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <SocialIcon 
                  href="https://linkedin.com/in/yourprofile" 
                  icon={
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  } 
                  label="LinkedIn"
                />
                
                <SocialIcon 
                  href="https://github.com/yourusername" 
                  icon={
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  }
                  label="GitHub"
                />
                
                <SocialIcon 
                  href="mailto:your.email@example.com"
                  icon={
                    <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                  }
                  label="Email"
                />
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{
                position: 'relative',
                maxWidth: '450px',
                mx: 'auto',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: '20px',
                  left: '20px',
                  border: `2px solid ${theme.palette.primary.main}`,
                  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                  zIndex: -1,
                  animation: `${float} 8s ease-in-out infinite`,
                },
              }}
            >
              <Box
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                  overflow: 'hidden',
                  border: `3px solid ${theme.palette.background.paper}`,
                  boxShadow: theme.shadows[8],
                  '& img': {
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  },
                }}
              >
                <img 
                  src="/profile.jpg" 
                  alt="Bharath Reddy" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=Bharath+Reddy&background=${theme.palette.primary.main.replace('#', '')}&color=fff&size=512`;
                  }}
                />
              </Box>
            </Box>
            
            <Box 
              component={motion.div}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              sx={{
                display: { xs: 'none', lg: 'block' },
                position: 'absolute',
                bottom: '-40px',
                right: '20px',
                background: theme.palette.background.paper,
                borderRadius: '16px',
                p: 2,
                boxShadow: theme.shadows[4],
                animation: `${float} 6s ease-in-out infinite`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: '12px', height: '12px', borderRadius: '50%', bgcolor: 'success.main' }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Available for work</Typography>
              </Box>
            </Box>
            
            {/* Tech stack icons floating around */}
            {!isMobile && (
              <>
                <TechIcon 
                  icon={
                    <path d="M12 0l-9.5 5.5v11l9.5 5.5 9.5-5.5v-11l-9.5-5.5zm-1 1.5l8.5 4.9v9.2l-8.5 4.9-8.5-4.9v-9.2l8.5-4.9zm4.5 4.5l-8.5 4.9 8.5 4.9 8.5-4.9-8.5-4.9z"/>
                  }
                  label="HTML5"
                  initial={{ x: -50, y: 50, opacity: 0 }}
                  animate={{ x: -20, y: 20, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  style={{ top: '20%', left: '0' }}
                />
                <TechIcon 
                  icon={
                    <path d="M12 0l-9.5 5.5v11l9.5 5.5 9.5-5.5v-11l-9.5-5.5zm-1 1.5l8.5 4.9v9.2l-8.5 4.9-8.5-4.9v-9.2l8.5-4.9zm-4.5 4.5l-1.4 1.4 3.5 3.5-3.5 3.5 1.4 1.4 3.5-3.5 3.5 3.5 1.4-1.4-3.5-3.5 3.5-3.5-1.4-1.4-3.5 3.5-3.5-3.5z"/>
                  }
                  label="CSS3"
                  initial={{ x: -30, y: 30, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  style={{ bottom: '20%', left: '10%' }}
                />
                <TechIcon 
                  icon={
                    <path d="M12 0l-9.5 5.5v11l9.5 5.5 9.5-5.5v-11l-9.5-5.5zm-1 1.5l8.5 4.9v9.2l-8.5 4.9-8.5-4.9v-9.2l8.5-4.9zm-4.5 4.5l-1.4 1.4 3.5 3.5-3.5 3.5 1.4 1.4 3.5-3.5 3.5 3.5 1.4-1.4-3.5-3.5 3.5-3.5-1.4-1.4-3.5 3.5-3.5-3.5z"/>
                  }
                  label="JavaScript"
                  initial={{ x: 30, y: 30, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  style={{ top: '30%', right: '10%' }}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Reusable Social Icon Component
const SocialIcon = ({ href, icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label={label}
    style={{ 
      color: 'inherit',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'rgba(0,0,0,0.03)',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.1)',
        transform: 'translateY(-3px)',
      },
    }}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      {icon}
    </svg>
  </a>
);

// Reusable Tech Icon Component
const TechIcon = ({ icon, label, style, ...motionProps }) => (
  <Box
    component={motion.div}
    {...motionProps}
    sx={{
      position: 'absolute',
      width: '40px',
      height: '40px',
      backgroundColor: 'background.paper',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 3,
      zIndex: 1,
      '&:hover': {
        transform: 'scale(1.1)',
      },
      ...style,
    }}
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    title={label}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      {icon}
    </svg>
  </Box>
);

export default Hero;
