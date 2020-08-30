window.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['words'],
    result => {
      const words = Object.keys(result.words || {});
      document.getElementById('words-count').textContent = words.length;
      document.getElementById('words').textContent = words.join(', ');

      document.getElementById('review').addEventListener('click', () => {
        window.open(chrome.runtime.getURL('review.html'));
      })

      document.getElementById('copy').addEventListener('click', () => {
        navigator.clipboard.writeText(
          Object.entries(result.words)
            .map(pair => `${pair[0]}\t${pair[1]}`).join('\n')
        );
        document.getElementById('copy').textContent = '已複製到剪貼簿！';
        document.getElementById('copy').disabled = true;
      });
    }
  );
});
