'use strict';
{
  class ClickGame{
    constructor(){
      this.numbers = [];
      this.level = 0;
      this.currentNum = 1;
      this.isfinished = false;
      this.startTime = 0;
    }
    getSize() {
      return this.level || 3;
    }

    selectLevel() {
      const timer = document.getElementById('timer');
      timer.textContent = 'select level';

      this.setBord();
      this.setNum();
      this.showNum();

      const button = document.getElementById('button');
      button.classList.add('clicked');

      const lis = document.querySelectorAll('li');
      lis.forEach((li, index) => {
        li.addEventListener('click', () => {
          lis.forEach(li => {
            li.classList.remove('clicked')
          });
          li.classList.add('clicked');
          button.classList.remove('clicked');
          this.level = index+1;
          console.log(this.level);
        });
      });
    }

    reset() {
      for (let i=0;i<1;i++){        
        const ul = document.querySelector('ul');
        while(ul.firstChild){
          ul.removeChild(ul.firstChild);
        }
        while(this.numbers[0]){
          this.numbers.shift();
        }
      }
    }
    
    setBord() {
      const section = document.querySelector('section');
      section.style.width = this.getSize()*70 + 'px';
      section.style.height = this.getSize()*70 + 'px';
    }
    setNum(){
      for(let i=0;i<this.getSize()**2;i++){
        this.numbers.push(i+1);
      }
    }
    shuffleNum() {
      for(let i=this.numbers.length-1;i>=0;i--){
        const n = Math.floor(Math.random()*i);
        [this.numbers[i], this.numbers[n]] = [this.numbers[n], this.numbers[i]];
      }
    }
    showNum() {
      const ul = document.querySelector('ul');
      this.numbers.forEach(num => {
        const li = document.createElement('li');
        li.textContent = num;
        ul.append(li);
      });
    }

    activ() {
      const lis = document.querySelectorAll('li');
      lis.forEach((li, index) => {
        li.addEventListener('click', () => {
          if(this.numbers[index] !== this.currentNum || li.classList.contains('clicked')){
            return;
          }
          li.classList.add('clicked');
          if(this.currentNum === this.numbers.length){
            this.isfinished = true;
          }
          this.currentNum++;
        });
      });
    }
    showTime() {
      const timer = document.getElementById('timer');
      timer.textContent = ((new Date() - this.startTime)/1000).toFixed(2) + 'sec';
      if(this.isfinished){
        return;
      }
      setTimeout(() => {
        this.showTime();
      }, 10);
    }

    retry(){
      if(this.isfinished){
        const button = document.getElementById('button');
        button.textContent = 'RETRY';
        button.classList.remove('clicked');
        button.addEventListener('click', () => {
          location.reload();
        });
      }
      setTimeout(() => {
        this.retry();
      }, 1000);
    }

    run() {
      this.reset();
      this.selectLevel();
      const button = document.getElementById('button');
      button.addEventListener('click', () => {
        if(this.level){
          this.reset();
          button.classList.add('clicked');
          this.setBord();
          this.setNum();
          this.shuffleNum();
          this.showNum();
          this.activ();
          this.startTime = new Date();
          this.showTime();
        }
      });
      this.retry();
    }
  }

  function main() {
    const clickGame = new ClickGame();
    clickGame.run();
  }
  main();
}