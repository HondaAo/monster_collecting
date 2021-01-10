import React, { Component } from "react";
import Battle from './contracts/Battle.json';
import "./App.css";
import Web3 from 'web3'
import Navbar from "./Layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0]})
    const networkId = await web3.eth.net.getId()
    const networkData = await Battle.networks[networkId]
    if(networkData){
      const monster = new web3.eth.Contract(Battle.abi, Battle.networks[networkId].address)
      this.setState({ monster })
      console.log(monster)
      const monstersCount = await monster.methods.monsterCount().call();
      for(let i=monstersCount; i>=1; i--){
        const _monster = await monster.methods.monsters(i).call();
        this.setState({ 
          monsters: [...this.state.monsters, _monster]
        })
      }
      const registered = await monster.methods.MyMonster(this.state.account).call();
      console.log(registered)
    }else{
      alert("error")
    }
  }

  CreateMonster = name => {
    this.setState({ loading: true })
    this.state.monster.methods._CreateMonster(name).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }
  LevelUp = id => {
    this.setState({ loading: true })
    this.state.monster.methods.LevelUp(id).send({ from: this.state.account}).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  RegisterMonster = name => {
    this.setState({ loading: true })
    this.state.monster.methods._RegisterMonster(name).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      monster: null,
      monsterRegister: null,
      monsters: [],
      loading: false,
      title: '',
      registerdMonsters: [],
    }
    this.CreateMonster = this.CreateMonster.bind(this)
    this.RegisterMonster = this.RegisterMonster.bind(this)
    this.LevelUp = this.LevelUp.bind(this)
  }

  render() {
    if (!this.state.account || this.state.loading ) {
      return <div>Loading...</div>;
    }
    return (
      <Router>
      <Navbar />
       <div className="App" style={{ padding: '5%'}}>
         <div className="app-left">
         <h2>Create Monster</h2>
         {this.state.monsters.length > 3 ? (
           <h2>You connot create monsters any more by yourself.</h2>
         ):(
           <form onSubmit={(e) => {
           e.preventDefault();
           this.CreateMonster(this.state.title)
         }}>
          <input type="text" onChange={(e) => this.setState({ title: e.target.value })} placeholder="monster name" />
          <button type="submit" className="btn">Create</button>
         </form>
         )}
         <div className="monster-box">
           <h3>Monsters List</h3>
        {this.state.monsters.length > 0 ? (  
         <table className="ui celled table">
           <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Level</th>
              <th>Attack</th>
              <th>Defence</th>
              <th>Level Up</th>
            </tr>
          </thead>
          <tbody>
          {this.state.monsters.map((monster, key)=>{
            return(
             <tr id={key}>
              <td>{monster.monsterName}</td>
              <td>{monster.number.toString().slice(0,3)}</td>
              <td>{monster.level}</td>
              <td>{monster.number.toString().slice(10,12)}</td>
              <td>{monster.number.toString().slice(13,15)}</td>
              <td><button className="ui primary basic button" onClick={() => this.LevelUp(monster.monsterId)}>Level Up</button></td>
             </tr>
            )
          })}
           </tbody>
          </table>
        ):(
          <h3>No monster exists.</h3>
        )}
         </div>
       </div>
       <div className="app-right">
         <div class="ui list">
           <div className="item">
             <i className="linkify icon"></i>
             <div className="content" style={{ fontSize: "8px"}}>{this.state.account}</div>
           </div>
         </div>
         <div className="register">
         <form onSubmit={(e) => {
           e.preventDefault();
           this.RegisterMonster(this.state.title)
         }}>
          <input type="text" onChange={(e) => this.setState({ title: e.target.value })} placeholder="monster name" />
          <button type="submit" className="btn">Add Monster</button>
         </form>
         </div>
         <div className="monsters">

         </div>
       </div>
       </div>
      </Router>
    );
  }
}

export default App;
