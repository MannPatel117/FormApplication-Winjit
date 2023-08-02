import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';

interface Player {
  playStatus : boolean
  wallet: number;
  hand: any,
  blindStatus: boolean;
}


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit{
  Player0: any;
  Player1: any;
  Player2: any;
  Player3: any;

  player0TurnC = false;
  playersRound: any[];
  Pot: number;
  currentBet: number;

  checkRound: boolean;

  ngOnInit(){
    this.fetchPlayerInfo();
  }
  createPlayer(wallet: number): Player {
    return {
      playStatus: true,
      wallet,
      hand: [],
      blindStatus: true,
    };
  }
  fetchPlayerInfo(){
    this.initPlayer0();
    this.initPlayer1();
    this.initPlayer2();
    this.initPlayer3();
  }

  initPlayer0(){
    const wallet = Number(localStorage.getItem('Player0'));
    this.Player0 = this.createPlayer(wallet);
  }
  initPlayer1(){
    const wallet = Number(localStorage.getItem('Player1'));
    this.Player1 = this.createPlayer(wallet);
  }
  initPlayer2(){
    const wallet = Number(localStorage.getItem('Player2'));
    this.Player2 = this.createPlayer(wallet);
  }
  initPlayer3(){
    const wallet = Number(localStorage.getItem('Player3'));
    this.Player3 = this.createPlayer(wallet);
    this.startGame();
  }

  async startGame(){
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  
    const deck = [];
  

  // Create the deck of cards

    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({ suit, rank });
      }
    }

    this.Pot=0;
    this.currentBet=10000;

    this.shuffleArray(deck);

    if(this.checkBalance(10000, this.Player0.wallet))
    {
      this.Player0.hand = this.drawThreeCards(deck);
      this.playersRound.push(this.Player0);
    }
    else{ this.Player0.playStatus = false; }



    if(this.checkBalance(10000, this.Player1.wallet))
    {
      this.Player1.hand = this.drawThreeCards(deck);
      this.playersRound.push(this.Player1);
    }
    else{ this.Player1.playStatus = false; }



    if(this.checkBalance(10000, this.Player2.wallet))
    {
      this.Player2.hand = this.drawThreeCards(deck);
      this.playersRound.push(this.Player2);
    }
    else{ this.Player2.playStatus = false; }



    if(this.checkBalance(10000, this.Player2.wallet))
    {
      this.Player3.hand = this.drawThreeCards(deck);
      this.playersRound.push(this.Player3);
    }
    else{ this.Player3.playStatus = false; }
    
    let roundEnd = await this.beginRound();
    
    while(!roundEnd)
    {
      if(!this.Player0.playStatus && !this.Player1.playStatus && !this.Player2.playStatus && !this.Player3.playStatus)
      {
        roundEnd = true;
      }

      else
      {
        if(this.Player0.playStatus)
        {
          await this.player0Turn();
        }
        if(this.Player1.playStatus)
        {
          await this.player1Turn(); 
        }
        if(this.Player2.playStatus)
        {
          await this.player2Turn(); 
        }
        if(this.Player3.playStatus)
        {
          await this.player3Turn(); 
        }
      }
    }
  }

  async beginRound (){
    let count =0;
    if(this.Player0.playStatus)
    {
      count++;
      this.Pot=this.Pot+10000;
      this.Player0.wallet=this.removeAmount(10000, this.Player0.wallet)
    }
    if(this.Player1.playStatus)
    {
      count++;
      this.Pot=this.Pot+10000;
      this.Player1.wallet=this.removeAmount(10000, this.Player1.wallet)
    }
    if(this.Player2.playStatus)
    {
      count++;
      this.Pot=this.Pot+10000;
      this.Player2.wallet=this.removeAmount(10000, this.Player2.wallet)
    }
    if(this.Player3.playStatus)
    {
      count++;
      this.Pot=this.Pot+10000;
      this.Player3.wallet=this.removeAmount(10000, this.Player3.wallet)
    }
    if(count>1)
    {
      return true;
    }
    if(count<2)
    {
      return false;
    }
  }


  async player0Turn(){
    this.player0TurnC = true;
    let value: any;
    switch(value)
    {
      case 0: this.playBlind(0);
      break;
      case 1: this.playChaal(0);
      break;
      case 2: this.playRaise(0)
      break;
      case 3: this.Player0.playStatus =false;
      const index = this.playersRound.find(this.Player0);
      if (index !== -1) {
        this.playersRound.splice(index, 1); // Remove 1 element at the specified index
      }
      break;
    }
  }

  async player1Turn(){
    if(this.Player1.blindStatus)
    {
      await this.checkBlindComp(1);
    }
    let value: any;
    switch(value)
    {
      case 0: this.playBlind(1);
      break;
      case 1: this.playChaal(1);
      break;
      case 2: this.playRaise(1)
      break;
      case 3: this.Player1.playStatus =false;
      const index = this.playersRound.find(this.Player0);
      if (index !== -1) {
        this.playersRound.splice(index, 1); // Remove 1 element at the specified index
      }
      break;
    }
  }

  async player2Turn(){
    if(this.Player2.blindStatus)
    {
      await this.checkBlindComp(2);
    }
    let value: any;
    switch(value)
    {
      case 0: this.playBlind(2);
      break;
      case 1: this.playChaal(2);
      break;
      case 2: this.playRaise(2)
      break;
      case 3: this.Player2.playStatus =false;
      const index = this.playersRound.find(this.Player0);
      if (index !== -1) {
        this.playersRound.splice(index, 1); // Remove 1 element at the specified index
      }
      break;
    }
  }

  async player3Turn(){
    if(this.Player3.blindStatus)
    {
      await this.checkBlindComp(3);
    }
    let value: any;
    switch(value)
    {
      case 0: this.playBlind(3);
      break;
      case 1: this.playChaal(3);
      break;
      case 2: this.playRaise(3)
      break;
      case 3: this.Player3.playStatus =false;
      const index = this.playersRound.find(this.Player0);
      if (index !== -1) {
        this.playersRound.splice(index, 1); // Remove 1 element at the specified index
      }
      break;
    }
  }
  // Function to Shuffle

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Function to draw three random cards from the deck

  drawThreeCards(deck: any[]): any[] {
    return deck.splice(0, 3);
  }

  // Function to check whether the player has the required amount of money

 
  checkBalance(betAmount : number, wallet: number)
  {
    if(betAmount > wallet)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  removeAmount(betAmount : number, wallet: number)
  {
    return wallet-betAmount;
  }

  addAmount(betAmount : number, wallet: number)
  {
    return wallet + betAmount;
  }

  addPot(betAmount: number)
  {
    return this.Pot + betAmount;
  }

  playBlind(id:number){
    switch(id)
    {
      case 0: 
      if(this.checkBalance(this.currentBet, this.Player0.wallet))
      {
        this.addPot(this.currentBet);
        this.removeAmount(this.currentBet, this.Player0.wallet);
      }
      else
      {
        alert("Insufficient Funds");
      }
      break;
      case 1: 
      if(this.checkBalance(this.currentBet, this.Player1.wallet))
      {
        this.addPot(this.currentBet);
        this.removeAmount(this.currentBet, this.Player1.wallet);
      }
      else
      {
        alert("Insufficient Funds");
      }
      break;
      case 2: 
      if(this.checkBalance(this.currentBet, this.Player2.wallet))
      {
        this.addPot(this.currentBet);
        this.removeAmount(this.currentBet, this.Player2.wallet);
      }
      else
      {
        alert("Insufficient Funds");
      }
      break;
      case 3: 
      if(this.checkBalance(this.currentBet, this.Player3.wallet))
      {
        this.addPot(this.currentBet);
        this.removeAmount(this.currentBet, this.Player3.wallet);
      }
      else
      {
        alert("Insufficient Funds");
      }
      break;
    }
  }

  checkAll(){
    if(this.Player0.blindStatus || this.Player1.blindStatus || this.Player2.blindStatus || this.Player3.blindStatus)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  playChaal(id:number){
    switch(id)
    {
      case 0: 
      if(this.checkAll())
      {
        let chal= this.currentBet *2;
        this.addPot(chal);
        if(this.checkBalance(chal, this.Player0.wallet))
        {
        this.removeAmount(chal, this.Player0.wallet);
        }
        else
        {
        alert("Insufficient Funds");
        }
      }
      
      
      
      break;
      case 1: 
          if(this.checkAll())
          {
            let chal= this.currentBet *2;
            this.addPot(chal);
            if(this.checkBalance(chal, this.Player1.wallet))
            {
            this.removeAmount(chal, this.Player1.wallet);
            }
            else
            {
            alert("Insufficient Funds");
            }
          }
      break;
      case 2: 
            if(this.checkAll())
                {
                  let chal= this.currentBet *2;
                  this.addPot(chal);
                  if(this.checkBalance(chal, this.Player2.wallet))
                  {
                  this.removeAmount(chal, this.Player2.wallet);
                  }
                  else
                  {
                  alert("Insufficient Funds");
                  }
                }
      break;
      case 3: 
      if(this.checkAll())
                {
                  let chal= this.currentBet *2;
                  this.addPot(chal);
                  if(this.checkBalance(chal, this.Player3.wallet))
                  {
                  this.removeAmount(chal, this.Player3.wallet);
                  }
                  else
                  {
                  alert("Insufficient Funds");
                  }
                }
      break;
    }
  }

  playRaise(id:number){
    this.currentBet=(this.currentBet*2);
    switch(id)
    {
      case 0: 
        if(this.Player0.blindStatus)
        {
          this.playBlind(0);
        }
        else
        {
          this.playChaal(0);
        }
      break;
      case 1: 
        if(this.Player1.blindStatus)
        {
          this.playBlind(1);
        }
        else
        {
          this.playChaal(1);
        }
      break;
      case 2: 
        if(this.Player2.blindStatus)
        {
          this.playBlind(2);
        }
        else
        {
          this.playChaal(2);
        }
      break;
      case 3: 
        if(this.Player3.blindStatus)
        {
          this.playBlind(3);
        }
        else
        {
          this.playChaal(3);
        }
      break;
    }
  }

  async checkBlindComp(playerno: number){
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
      switch(playerno)
      {
        case 1: this.Player1.blindStatus = false;
        break;
        case 2: this.Player2.blindStatus = false;
        break;
        case 3: this.Player3.blindStatus = false;
        break;
      }
  } 
  }
}
