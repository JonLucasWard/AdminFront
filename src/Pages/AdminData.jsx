import * as React from 'react';
import {AdminTable} from '../Models/AdminTable';
import {axios, errorLogger} from '../Etc/axiosU';
import {Button} from 'reactstrap';
import {AdminEditTable} from '../Models/AdminEditTable';
import {UpdateAdmin} from '../Models/UpdateAdmin';

const AD = '/AdminData/';

export class AdminData extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        adminData: [],
        data:[],
        editMe: [],
        submitMe: [],
        table: {
        tableName: "age",
        adminTable: "admindb",
        min: 1,
        max: 20,
        adminMin: 1,
        adminMax: 20
            }
        }
        this.handleTable = this.handleTable.bind(this);
        this.getTable = this.getTable.bind(this);
        this.makeEdit = this.makeEdit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.approve = this.approve.bind(this);
        this.deny = this.deny.bind(this);
        }
    
    handleEdit(e){
        let key = e.target.name;
        let value = e.target.value;
        if(key === "id" || key === "mainid" || key === "otherid" || key === "timestamp"){
            return; //we don't want to edit the above values, too many problems. Just approve/deny, upload as new entry if it was good.
        }
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
    
    approve(e){
        let objecto = this.state.data[e];
        this.setState({submitMe: objecto});

        axios.post(AD+"addToMain/"+this.state.table.tableName, [this.state.submitMe]).then(response=>{
            this.setState({submitMe: []});
        }).catch(error =>{
            alert("Check the logs");
            errorLogger(error);
        });

        this.getTable();
        console.log("Finished approve, tables should have updated with appropriate data");
    }

    deny(e){
        let objecto = this.state.data[e];
        this.setState({submitMe: objecto});

        axios.post(AD+"denyInput/"+this.state.table.tableName, [this.state.submitMe]).then(response=>{
            this.setState({submitMe: []});
        }).catch(error =>{
            alert("Check the logs");
            errorLogger(error);
        });

        this.getTable();
        console.log("Finished deny, tables should have updated with appropriate data");
    }

    handleTable(e){
        let objecto = {...this.state.table};
        switch(e.target.name){
            case "min":
                objecto["min"] = e.target.value;
                break;
            case "max":
                objecto["max"] = e.target.value;
                break;
            case "adminMin":
                objecto["adminMin"] = e.target.value;
                break;
            case "adminMax":
                objecto["adminMax"] = e.target.value;;
                break;
            case "table":
                objecto["table"] = e.target.value;
            default:
                console.log("How did you do this???");
                break;
        }
        this.setState({table: objecto});
    }

    uploadRow(e){
        axios.post(AD+"putData/"+this.state.table.tableName, [this.state.editMe]).then(response=>{
            alert("Data sent to server.");
        }).catch(error =>{
            errorLogger(error);
        });

        this.getTable();
        console.log("Finished update, tables should have updated accordingly");
    }


    getTable(e){
        axios.get(AD+"getTable/"+this.state.table.tableName+"/"+this.state.table.min+"/"+this.state.table.max).then(response=>{
            let dataGet = response.data;
            this.setState({'data': dataGet});
        }).catch(error => {
            errorLogger(error);
        });
    }

    getAdminTable(e){
        axios.get(AD+"getTable/"+this.state.table.adminTable+"/"+this.state.table.adminMin+"/"+this.state.table.adminMax).then(response=>{
            let dataGet = response.data;
            this.setState({'adminData': dataGet});
        }).catch(error => {
            errorLogger(error);
        });
    }

    loadData(key){
        switch(key){
            case 'adminTable':
            if(this.state.data.length !== 0){ //check for civlization, if there isn't one, don't do anything
                    let holdme = <AdminTable tableName ={this.state.table.tableName} data={this.state.data}/> //we must pass in key (to suppress warnings), number (count of a given Civ object in an array), and the civ object itself
                    return holdme; //that list of Civilization components is added to the holdMe object, we now pass that object which is loaded with JSX, it will populate the page
                } else {
                    let holdme = <p>No call was made yet. Or there was no data for that table/page.</p>
                    return holdme;
                }
                break;
            case 'table':
                if(this.state.data.length !== 0){ //check for civlization, if there isn't one, don't do anything
                        let holdme = <AdminEditTable tableName = {this.state.table.tableName} data={this.state.data} makeEdit={this.makeEdit} approve={this.approve} deny={this.deny}/> //we must pass in key (to suppress warnings), number (count of a given Civ object in an array), and the civ object itself
                        return holdme; //that list of Civilization components is added to the holdMe object, we now pass that object which is loaded with JSX, it will populate the page
                    } else {
                        let holdme = <p>No call was made yet. Or there was no data for that table/page.</p>
                        return holdme;
                    }
                    break;
            case 'editMe':
                if(this.state.editMe.length !== 0){
                    let holdme = <div><UpdateAdmin data={this.state.editMe} handleEdit={this.handleEdit}/><Button value={this.state.editMe} onClick={() => this.uploadRow()}>Upload</Button></div>
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

            <p>Admin Min: </p><input name="adminMin" type="number" min="0" onChange={this.handleTable} value={this.state.table.adminMin}/>
            <p>Admin Max:</p><input name="adminMax" type="number" min="1" onChange={this.handleTable} value={this.state.table.adminMax}/>
            <Button onClick={this.getAdminTable}>Get Admin Data</Button>
            {this.loadData("adminTable")}

            <p>Select a Table:</p>
            <input type="text" list="tableName" name="tableName" onChange={this.handleTable}/>
                <datalist id="tableName" value={this.state.table.tableName}>
                    <option value="activation"/>
                    <option value="age"/>
                    <option value="apocalypse"/>
                </datalist>
            <p>Min: </p><input name="min" type="number" min="0" onChange={this.handleTable} value={this.state.table.min}/>
            <p>Max:</p><input name="max" type="number" min="1" onChange={this.handleTable} value={this.state.table.max}/>
            <Button onClick={this.getAdminTable}>Get Admin Data</Button>
            {this.loadData("adminTable")}
            {this.loadData("editMe")}

            </div>
        )
    }
}