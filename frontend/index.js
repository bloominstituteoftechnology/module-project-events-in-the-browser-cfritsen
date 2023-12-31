// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)

      square.addEventListener('click', (event) => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        if (event.target.nodeName !== 'IMG'){
          let selection = document.querySelector('.square.targeted');
          selection.classList.remove('targeted');
          event.target.classList.add('targeted');
        } else {
          let selection = document.querySelector('.square.targeted');
          selection.classList.remove('targeted');
          event.target.parentElement.classList.add('targeted');
        }
        
      })
    }
  }

  

  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.style.cursor = 'default'
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  let restartBtn = document.createElement('button')
  let headerH2 = document.querySelector('header h2')
  restartBtn.classList.add('button')
  Object.assign(restartBtn.style, {display: 'block', margin: 'auto', display: 'none'})
  restartBtn.textContent = "Restart Game"
  headerH2.appendChild(restartBtn)
  let restartButton = document.querySelector('header h2 button')

  //Function to process End Game activities
  function endGame(){
    restartButton.style.display = 'block'
    let timeInSeconds = getTimeElapsed() / 1000
    document.querySelector('p.info').textContent = `Extermination completed in ${timeInSeconds} seconds!`
  }

  //Reset game with Restart button
  restartButton.addEventListener('click', () => {
    //location.reload()

    restartButton.style.display = 'none'
    startTime = new Date().getTime()

    for (let i = 0; i < allSquares.length; i++){
      if (allSquares[i].firstChild){
        allSquares[i].firstChild.remove()
      }
      allSquares[i].style.backgroundColor = 'white'
    }
    let currentSquare = document.querySelector('.square.targeted')
    currentSquare.classList.remove('targeted');

    generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
      let mosquito = document.createElement('img')
      mosquito.src = './mosquito.png'
      mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
      mosquito.style.cursor = 'default'
      mosquito.dataset.status = 'alive'
      allSquares[randomInt].appendChild(mosquito)
    })

    document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

    document.querySelector('p.info').textContent = "Use arrow keys or mouse clicks to target, space bar to exterminate!"

  })

  document.addEventListener('keydown', evt => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    if (evt.key === keys.up){
      let currentSquare = document.querySelector('.square.targeted');
      let parentRow = currentSquare.parentElement;
      if (parentRow.previousElementSibling){
        let index = Array.from(parentRow.children).indexOf(currentSquare);
        currentSquare.classList.remove('targeted');
        parentRow.previousElementSibling.children[index].classList.add('targeted');
      }
    }
    if (evt.key === keys.down){
      let currentSquare = document.querySelector('.square.targeted');
      let parentRow = currentSquare.parentElement;
      if (parentRow.nextElementSibling){
        let index = Array.from(parentRow.children).indexOf(currentSquare);
        currentSquare.classList.remove('targeted');
        parentRow.nextElementSibling.children[index].classList.add('targeted');
      }
    }
    if (evt.key === keys.left){
      let currentSquare = document.querySelector('.square.targeted');
      if (currentSquare.previousElementSibling){
        currentSquare.classList.remove('targeted');
        currentSquare.previousElementSibling.classList.add('targeted');
      }
    }
    if (evt.key === keys.right){
      let currentSquare = document.querySelector('.square.targeted');
      if (currentSquare.nextElementSibling){
        currentSquare.classList.remove('targeted');
        currentSquare.nextElementSibling.classList.add('targeted');
      }
    }


    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
    if (evt.key === keys.space){
      let currentSquare = document.querySelector('.square.targeted');
      if (currentSquare.firstChild){
        currentSquare.firstChild.dataset.status = 'dead';
        currentSquare.style.backgroundColor = 'red';
        if (Array.from(document.querySelectorAll('[data-status = alive]')).length === 0){
          endGame();
        }
      }
    }

    // 👉 TASK 5 - End the game 👈
  

  })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
