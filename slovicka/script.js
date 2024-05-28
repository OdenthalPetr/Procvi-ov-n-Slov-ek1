
document.addEventListener('DOMContentLoaded', function() {
    const flashcardForm = document.getElementById('flashcard-form');
    const flashcardsContainer = document.getElementById('flashcards-container');

    loadFlashcards();

    flashcardForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
       
        const englishWord = document.getElementById('english-word').value;
        const czechTranslation = document.getElementById('czech-translation').value;
        const explanation = document.getElementById('explanation').value;

        const flashcard = {
            englishWord: englishWord,
            czechTranslation: czechTranslation,
            explanation: explanation
        };
        addFlashcard(flashcard);

        flashcardForm.reset();
    });
    function addFlashcard(flashcard) {
        let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        flashcards.push(flashcard);
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        displayFlashcards();
    }

    function loadFlashcards() {
        let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        if (flashcards.length > 0) {
            displayFlashcards();
        }
    }
    function displayFlashcards() {
        let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        flashcardsContainer.innerHTML = '';
        flashcards.forEach(function(flashcard, index) {
            const card = document.createElement('div');
            card.classList.add('flashcard');
            card.innerHTML = `
                <p><strong>${flashcard.englishWord}</strong></p>
                <p>${flashcard.czechTranslation}</p>
                <p class="explanation">${flashcard.explanation}</p>
                <button class="flip-button" onclick="flipFlashcard(${index})">Otočit</button>
                <button class="delete-button" onclick="deleteFlashcard(${index})">Smazat</button>
            `;
            flashcardsContainer.appendChild(card);
        });
    }
    window.flipFlashcard = function(index) {
        const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        const explanation = document.querySelectorAll('.explanation')[index];
        if (explanation.style.display === 'none' || !explanation.style.display) {
            explanation.style.display = 'block';
        } else {
            explanation.style.display = 'none';
        }
    }
    window.deleteFlashcard = function(index) {
        let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        flashcards.splice(index, 1);
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        displayFlashcards();
    }
});



  
  
