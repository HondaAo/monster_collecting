import React, { Component } from "react";
import CreateMonster from './contracts/CreateMonster.json';
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
    const networkData = await CreateMonster.networks[networkId]
    console.log(accounts)
    if(networkData){
      const monster = new web3.eth.Contract(CreateMonster.abi, CreateMonster.networks[networkId].address)
      this.setState({ monster })
      console.log(monster)
      const monstersCount = await monster.methods.monsterCount().call();
      console.log(monstersCount)
      for(let i=monstersCount; i>=1; i--){
        const _monster = await monster.methods.monsters(i).call();
        this.setState({ 
          monsters: [...this.state.monsters, _monster]
        })
      }
      console.log(this.state.monsters)
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

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      monster: null,
      monsters: [],
      loading: false,
      title: ''
    }
    this.CreateMonster = this.CreateMonster.bind(this)
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
         <h2>Create Monster</h2>
         <form onSubmit={(e) => {
           e.preventDefault();
           this.CreateMonster(this.state.title)
         }}>
          <input type="text" onChange={(e) => this.setState({ title: e.target.value })} placeholder="monster name" />
          <button type="submit" className="btn">Create</button>
         </form>
         <div className="monster-box">
         <table className="ui single line table">
           <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th>Level</th>
              <th>Level Up</th>
            </tr>
          </thead>
          <tbody>
          {this.state.monsters.map((monster, key)=>{
            return(
             <tr id={key}>
              <td>{monster.monsterName}</td>
              <td>{monster.number}</td>
              <td>{monster.level}</td>
              <td><button className="ui primary basic button" onClick={() => this.LevelUp(monster.monsterId)}>Level Up</button></td>
             </tr>
            )
          })}
           </tbody>
          </table>
         </div>
       </div>
      </Router>
    );
  }
}

export default App;
