const firstContainer = document.getElementById('first-container');
const secondContainer = document.getElementById('second-container');
const resetButton = document.getElementById('reset-button');
firstContainer.addEventListener('dragstart', dragStart);
secondContainer.addEventListener('dragover', dragOver);
secondContainer.addEventListener('drop', drop);
resetButton.addEventListener('click', resetContainers);

let draggedItem = null;

function dragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', event.target.innerHTML);
  event.target.classList.add('dragging');
}

function dragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function drop(event) {
  event.preventDefault();
  if (event.target.classList.contains('drop-container')) {
    event.target.innerHTML += event.dataTransfer.getData('text/html');
    draggedItem.parentNode.removeChild(draggedItem);
    draggedItem = null;
    showSuccessMessage('Item dropped successfully!');
  }
}

function resetContainers() {
  firstContainer.innerHTML = '<div class="item" draggable="true">Item 1</div><div class="item" draggable="true">Item 2</div><div class="item" draggable="true">Item 3</div>';
  secondContainer.innerHTML = '';
  hideSuccessMessage();
}

function showSuccessMessage(message) {
  const successMessage = document.createElement('div');
  successMessage.classList.add('success-message');
  successMessage.innerText = message;
  document.body.appendChild(successMessage);
}

function hideSuccessMessage() {
  const successMessage = document.querySelector('.success-message');
  if (successMessage) {
    successMessage.parentNode.removeChild(successMessage);
  }
}
