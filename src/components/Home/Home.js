import React from 'react';
import LogOut from '../Login/LogOut';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <LogOut></LogOut>
    </Card>
  );
};

export default Home;
