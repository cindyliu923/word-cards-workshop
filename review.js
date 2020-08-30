const cardTemplate = document.createElement('template');
cardTemplate.innerHTML = `
  <div class='card'>
    <button class='button button-delete'>X</button>
    <p class='word'></p>
    <p class='definition'></p>
  </div>
`;

// ============================================================================

window.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['words'],
    result => {
      const words = Object.keys(result.words || {});
      let wordConut = words.length;
      document.getElementById('words-count').textContent = wordConut;

      Object.entries(result.words || {}).forEach(pair => {
        const cardDOM = document.importNode(cardTemplate.content, true);
        cardDOM.querySelector('.word').textContent = pair[0];
        cardDOM.querySelector('.definition').textContent = pair[1];

        // 因為 cardDOM appendChild 之後就消失了，所以要另外先存起來
        const cardDiv = cardDOM.querySelector('.card');

        cardDOM.querySelector('.button-delete').addEventListener('click', () => {
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
          delete result.words[pair[0]];
          chrome.storage.local.set({ words: result.words});
          cardDiv.remove();
          wordConut -= 1;
          document.getElementById('words-count').textContent = wordConut;
        })

        document.getElementById('cards').appendChild(cardDOM);
      });

      document.getElementById('clear').addEventListener('click', () => {
        chrome.storage.local.set({ words: {} });
        wordConut = 0;
        document.getElementById('words-count').textContent = wordConut;
        document.getElementById('cards').innerHTML = '';
      })
    }
  );
})
