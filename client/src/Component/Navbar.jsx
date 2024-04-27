import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import Styles from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const isUploadPage = location.pathname === '/upload';

  return (
    <>
      <Box className={Styles.Container}>
        <Link to="/">
          <Text className={Styles.Head}>Workflow Builder</Text>
        </Link>
        {isUploadPage ? (
          <Link to="/">
            <Button>WORKFLOWS</Button>
          </Link>
        ) : (
          <Link to="/upload">
            <Button>UPLOAD DATA</Button>
          </Link>
        )}
      </Box>
    </>
  );
};

export default Navbar;
