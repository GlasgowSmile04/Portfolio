class Typewriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    //CURRENT INDEX OF WORD
  const current = this.wordIndex % this.words.length;
  //GET FULL TEXT OF CURRENT WORD
  const fullTxt = this.words[current];

  //CHECK IF DELETING
  if (this.isDeleting) {
    //REMOVE CHAR
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //ADD CHAR
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  //INSERT TXT INTO ELEMENT
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //INITIAL TYPE SPEED
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  //CHECK IF WORD IS COMPLETE
  if (!this.isDeleting && this.txt === fullTxt) {
    //PAUSE AT END
    typeSpeed = this.wait;
    this.isDeleting = true
  } else if(this.isDeleting && this.txt === ''){
    this.isDeleting = false;
    //MOVE TO NEXT WORD & WAIT AT END
    this.wordIndex++;
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed)
};

}

//INIT ON DOM LOAD
document.addEventListener('DOMContentLoaded', init);
//INIT APP
function init(){
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  //INIT TYPEWRITER
  new Typewriter(txtElement, words, wait);
}
