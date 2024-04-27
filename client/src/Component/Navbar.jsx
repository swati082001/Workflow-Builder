import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import Styles from "./Navbar.module.css";

// Navbar component definition
const Navbar = () => {
  // Get current location using React Router's useLocation hook
  const location = useLocation();

  // Check if the current page is the upload page
  const isUploadPage = location.pathname === '/upload';

  return (
    <>
      {/* Container for the navbar */}
      <Box className={Styles.Container}>
        {/* Link to the home page */}
        <Link to="/">
          {/* Text for the heading */}
          <Text className={Styles.Head}>Workflow Builder</Text>
        </Link>
        {/* Conditional rendering based on whether the current page is the upload page */}
        {isUploadPage ? (
          // If on the upload page, render a link to the home page with a button for workflows
          <Link to="/">
            <Button>WORKFLOWS</Button>
          </Link>
        ) : (
          // If not on the upload page, render a link to the upload page with a button for uploading data
          <Link to="/upload">
            <Button>UPLOAD DATA</Button>
          </Link>
        )}
      </Box>
    </>
  );
};

export default Navbar;
