import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import {Button} from 'reactstrap';

//for when we want to update a value in the admin table for whatever reason

export class UpdateAdmin extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.data = props.data; //assign a unique prop value, inherited from parent
        this.handleEdit = props.handleEdit;
    }

    startColumns(){ //list names of the columns
        let holdMe = Object.keys(this.props.data).map(key =>
            <TableCell>
                <p>{key}</p>
            </TableCell>
            );
        return holdMe;
    }

    checkNum(key){
        if(key === "id" || key ==="cr" || key==="mainid" || key==="otherid"){
            return "number";
        } else{
            return "text";
        }
    }

    startDataCells(){ //create specific cells of data
        let holdMe = Object.keys(this.props.data).map(key =>
            <TableCell>
            <input type={this.checkNum(key)} min="1" onChange={this.props.handleEdit} name={key} value={this.props.data[key]}/>
            </TableCell>
        );
        return holdMe;
    }

    render(){
        return (
        <TableContainer className="ObjectDisplay"> {/*Create a container to hold this whole table thing, class gives some basic values for CSS*/}
            <Table style={{border:"solid"}}> {/*The actual table, we give it a solid border so it's clear*/}
                <TableBody>
                    <TableRow>
                        {this.startColumns()}
                    </TableRow>
                    <TableRow>
                        {this.startDataCells()}
                    </TableRow>
                </TableBody>

                </Table>
        </TableContainer>
        );
    }
}