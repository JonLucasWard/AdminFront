import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import {Button} from 'reactstrap';

//This table differs from the user table i nthat it has more buttons to be used
export class AdminEditTable extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.data = props.data; //assign a unique prop value, inherited from parent
        this.tableName = props.tableName; //likewise, a number property, props must be forced to be treated as a number to count correctly according to humans
        this.makeEdit = props.makeEdit;
        this.approve = props.approve;
        this.deny = props.deny;
    }

    startColumns(){ //list names of the columns
        let holdMe = Object.keys(this.props.data[0]).map(key =>
            <TableCell>
                <p>{key}</p>
            </TableCell>
            );
        return holdMe;
    }

    startDataRows(){ //create rows for data
        let holdMe = Object.keys(this.props.data).map(key => 
                <TableRow>
                    {this.startDataCells(key)}
                    <Button value={key} onClick={() => this.props.makeEdit(key)}>Edit</Button>
                    <Button value={key} onClick={() => this.props.approve(key)}>Approve</Button>
                    <Button value={key} onClick={() => this.props.deny(key)}>Deny</Button>
                </TableRow>
        );

        return holdMe;
    }

    startDataCells(key1){ //create specific cells of data
        let holdMe = Object.keys(this.props.data[key1]).map(key =>
            <TableCell>
            <p>{this.props.data[key1][key]}</p>
            </TableCell>
            );
        return holdMe;
    }

    render(){
        return (
        <TableContainer className="ObjectDisplay"> {/*Create a container to hold this whole table thing, class gives some basic values for CSS*/}
            <Table style={{border:"solid"}}> {/*The actual table, we give it a solid border so it's clear*/}
                <TableHead>
                    <TableRow>
                        {/*A "header" row, we'll have a few of these that set up for sections in the object for easier organization, colspan {3} means that it crosses 3 columns*/}
                        <TableCell align="center" colSpan={Object.keys(this.props.data[0]).length}>
                            <p>{this.props.tableName}</p>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {this.startColumns()}
                    </TableRow>
                    {this.startDataRows()}
                </TableBody>

                </Table>
        </TableContainer>
        );
    }
}