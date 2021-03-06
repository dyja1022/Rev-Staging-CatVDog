import { Component, OnInit } from '@angular/core';
import { SwitchPageService } from '../services/switch-page.service';
import { ManageStatusService } from '../services/manage-status.service';
import { ManageSessionService } from '../services/manage-session.service';
import { SoundsService } from '../services/sounds.service';
import { AnimationService } from '../services/animation.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-pet-manage-screen',
  templateUrl: './pet-manage-screen.component.html',
  styleUrls: ['./pet-manage-screen.component.css']
})
export class PetManageScreenComponent implements OnInit {
  myTimer;
  expBar;
  healthBar;
  hungerBar;
  warning:boolean =  false;

  player = {
    totalBattles:null,
    Wins:null,
    Loss:null,
    Affiliation: null,
    Experience: null
  }


  constructor(
    private switchpage:SwitchPageService,
    public status:ManageStatusService,
    public sess:ManageSessionService,
    public sounds:SoundsService,
    public anim:AnimationService,
    private account:AccountService,
  ) { }

  animateOnClick() {
    let elem = document.getElementById("pet");

    if (elem.style.backgroundPositionX == "-160px")
      elem.style.backgroundPosition = `0px 0px`;
    else 
      elem.style.backgroundPosition = `-160px 0px`;
  }

  animateScript() {
    let elem = document.getElementById("pet");
    const  slice = 160;
    var    position = slice; //start position for the image slicer
    const  interval = 150; //100 ms of interval for the setInterval()

    setInterval ( () => {

      elem.style.backgroundPositionX = `-${position}px`;
      if (position < (slice * 12))
      {
         position += slice;
      }
      //we increment the position by {position} each time
      else
      { position = slice; }

    }, interval );
  }

  ngOnInit(): void 
  {
   this.sounds.playLoop(this.sounds.list().profile)
   this.animateScript();
  }

  ngAfterViewInit()
  {
    this.status.setFullBar(".bar-wrapper");

    this.expBar = this.sess.getExperience();
    this.healthBar = this.sess.getHealth();
    this.hungerBar = this.sess.getHunger();

    this.status.setBar("experience",this.expBar);
    this.status.setBar("health",this.healthBar);
    this.status.setBar("hunger",this.hungerBar);


    this.lowerHungerOverTime();

    this.player.totalBattles = Number(sessionStorage.getItem("totalBattles"));

    this.player.Wins = Number(sessionStorage.getItem("win"));
    this.player.Loss = Number(sessionStorage.getItem("loss"));
    this.player.Experience = sessionStorage.getItem("expLevel");
    this.player.Affiliation = sessionStorage.getItem("side");
    
    this.showStats();
  }

  showStats(){
    document.getElementById("totalBattles").innerHTML += "<br>" +this.player.totalBattles;
    document.getElementById("wins").innerHTML += "<br>" +this.player.Wins;
    document.getElementById("losses").innerHTML += "<br>" +this.player.Loss;
    document.getElementById("exp").innerHTML += "<br>" +this.player.Experience;
    document.getElementById("exp-lvl").innerHTML = "" +this.player.Experience;
    document.getElementById("side").innerHTML += "<br>" +this.player.Affiliation;
  }

  //decrease hunger bar over time
  lowerHungerOverTime()
  { 
    this.myTimer = setInterval(()=>{
      this.status.lowerBar("hunger",2);
      this.getAllBars();

      if(this.status.getBarPercent("hunger") <= 0){
        //half the hp
        //lower health
        if(this.warning == false)
        {
          alert("Warning, if you don't feed your pet, it'll die!");
          this.warning = true;
        }
       
        this.status.lowerBar("health",1)        
      }
      if(this.status.getBarPercent("health") <= 0){
        //alert("you died");

        //this.anim.chooseAnimation(this.player.animal.defeat,this.player.box,"defeat");
        alert("you died");
        this.status.setBar("health",100)
      }
    },2000);
  } 
  
  lowerBar(id){
    this.status.lowerBar(id,5);
    this.getAllBars();
  }

  raiseBar(id){
    this.status.raiseBar(id,5);
    this.getAllBars();
  }

  GivePotion()
  {
    this.sounds.playOnce(this.sounds.list().potion)
    this.status.raiseBar('health',25);
    this.getAllBars();
  }

  GiveFood()
  {
    this.sounds.playOnce(this.sounds.list().eat)
    this.status.raiseBar('hunger',5);
    this.getAllBars();
  }

  getAllBars()
  {
    this.expBar =  this.status.getBarPercent("experience");
    this.healthBar = this.status.getBarPercent("health");
    this.hungerBar = this.status.getBarPercent("hunger");
  }

  Logout()
  {
    sessionStorage.removeItem('id');
    this.switchpage.changePage('login')
  }

  Close()
  {
    this.switchpage.changePage('traverse')
  }

  ngOnDestroy(){
    clearInterval(this.myTimer);
    this.sess.setExperience(this.expBar);
    this.sess.setHealth(this.healthBar);
    this.sess.setHunger(this.hungerBar);

  }
}
