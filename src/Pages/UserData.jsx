import * as React from 'react';
import {DataTable} from '../Models/DataTable';
import {axios, errorLogger} from '../Etc/axiosU';
import {Button} from 'reactstrap';
import {UpdateSection} from '../Models/UpdateSection';

const UD = '/UserData/';

export class UserData extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            editMe: [],
            table: {
                tableName: "age",
                pageNum: "1",
                min: 1,
                max: 20
            }
        }
        this.handleTable = this.handleTable.bind(this);
        this.getTable = this.getTable.bind(this);
        this.makeEdit = this.makeEdit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(e){
        let key = e.target.name;
        let value = e.target.value;
        if(key === "cr"){
            if(value > 60){
                value = 60;
            }
        }
        let objecto = {...this.state.editMe, [key]: value};
        this.setState({editMe: objecto});
        return;
    }

    makeEdit(e){
        let objecto = this.state.data[e];
        this.setState({editMe: objecto});
        return;
    }

    handleTable(e){
        let objecto = {...this.state.table};
        objecto[e.target.name] = e.target.value;
        if(e.target.name === "pageNum"){
            let newMin = 1+20*(e.target.value-1);
            let newMax = 20+20*(e.target.value-1);
            objecto["min"] = newMin;
            objecto["max"] = newMax;
        }
        this.setState({table: objecto});
    }

    uploadRow(e){
        axios.post(UD+"putData/"+this.state.table.tableName, [this.state.editMe]).then(response=>{
            alert("Data sent to server.");
        }).catch(error =>{
            errorLogger(error);
        });
    }


    getTable(e){
        axios.get(UD+"getTable/"+this.state.table.tableName+"/"+this.state.table.min+"/"+this.state.table.max).then(response=>{
            let dataGet = response.data;
            this.setState({'data': dataGet});
        }).catch(error => {
            errorLogger(error);
        });
    }

    loadData(key){
        switch(key){
            case 'table':
            if(this.state.data.length !== 0){ //check for civlization, if there isn't one, don't do anything
                    let holdme = <DataTable tableName = {this.state.table.tableName} data={this.state.data} makeEdit={this.makeEdit}/> //we must pass in key (to suppress warnings), number (count of a given Civ object in an array), and the civ object itself
                    return holdme; //that list of Civilization components is added to the holdMe object, we now pass that object which is loaded with JSX, it will populate the page
                } else {
                    let holdme = <p>No call was made yet. Or there was no data for that table/page.</p>
                    return holdme;
                }
                break;
            case 'editMe':
                if(this.state.editMe.length !== 0){
                    let holdme = <div><UpdateSection data={this.state.editMe} handleEdit={this.handleEdit}/><Button value={this.state.editMe} onClick={() => this.uploadRow()}>Upload</Button></div>
                    return holdme;
                } else{
                }
                break;
            default:
                break;
        }
    }
    
    render(){
        return (
            <div>
            <p>Select a Table:</p>
            <input type="text" list="tableName" name="tableName" onChange={this.handleTable}/>
                <datalist id="tableName" value={this.state.table.tableName}>
                    <option value="activation"/>
                    <option value="age"/>
                    <option value="apocalypse"/>
                </datalist>
            <p>You are on page: </p><input name="pageNum" type="number" min="1" onChange={this.handleTable} value={this.state.table.pageNum}/>
            <Button onClick={this.getTable}>Get Data</Button>
            {this.loadData("table")}
            {this.loadData("editMe")}

            </div>
        )
    }
}