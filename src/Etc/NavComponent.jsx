import * as React from 'react';
import { Link } from 'react-router-dom';
import {AppBar}  from '@material-ui/core';
import {Button, ButtonGroup, Container} from 'reactstrap';

//we use the AppBar and Toolbar from Material UI to style the top
//Use a Container to center the navbar, and then ButtonGroup to style it so that the buttons seamless flow into each other as a rounded rectangle
//Then use reacstrap buttons, with each having the Link component from the react Router passed in as a "tag" and the include a to property going to the desired URL extension, display text is between button tags
const NavComponent = () => {
    return (
            <AppBar style={{position: "sticky"}}>
                <Container>
                <p>DGenerator.com For all your random ADMIN needs</p>
                    <ButtonGroup>
                        <Button tag={Link} to="/UserData">Public Tables</Button>
                        <Button tag={Link} to="/AdminData">Admin Tables</Button>
                        <Button tag={Link} to="/Blog">Blog</Button>
                    </ButtonGroup>
                </Container>
            </AppBar>
    )
}

export default NavComponent;