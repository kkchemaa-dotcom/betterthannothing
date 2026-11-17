// Shows one language at a time. Default: the browser's language, then the last choice.
(function () {
  var KEY = 'btn-lang';
  var mains = document.querySelectorAll('main[lang]');
  var buttons = document.querySelectorAll('.lang button[data-lang]');
  if (mains.length < 2) return;

  function pick(lang) {
    mains.forEach(function (m) { m.hidden = m.getAttribute('lang') !== lang; });
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    document.documentElement.lang = lang;
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var initial = saved || (/^zh/i.test(navigator.language || '') ? 'zh-Hant' : 'en');
  pick(initial);

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var lang = b.getAttribute('data-lang');
      pick(lang);
      try { localStorage.setItem(KEY, lang); } catch (e) {}
    });
  });
})();
