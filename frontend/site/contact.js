(function () {
  'use strict';

  var navToggle = document.querySelector('[data-testid="nav-toggle"]');
  var navMenu = document.querySelector('[data-testid="nav-menu"]');

  function setMenu(open) {
    if (!navToggle || !navMenu) return;
    navMenu.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.contains('is-open');
      setMenu(!isOpen);
    });

    navMenu.addEventListener('click', function (e) {
      var target = e.target;
      if (target && target.closest('a')) setMenu(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) setMenu(false);
    });
  }

  var toast = document.querySelector('[data-testid="toast"]');
  var toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 3000);
  }

  var chatBtn = document.querySelector('[data-testid="start-chat-btn"]');
  if (chatBtn) {
    chatBtn.addEventListener('click', function () {
      showToast('Live chat support will be available soon.');
    });
  }

  var talkBtn = document.querySelector('[data-testid="talk-to-team-btn"]');
  var formCard = document.querySelector('[data-testid="contact-form-card"]');
  var subjectSelect = document.querySelector('[data-testid="form-subject"]');
  var messageTextarea = document.querySelector('[data-testid="form-message"]');

  function scrollToForm() {
    if (formCard && formCard.scrollIntoView) {
      formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (talkBtn) {
    talkBtn.addEventListener('click', function () {
      scrollToForm();
    });
  }

  var expertButtons = document.querySelectorAll('[data-expert-contact]');
  if (expertButtons && expertButtons.length) {
    expertButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        scrollToForm();
        if (subjectSelect) subjectSelect.value = 'Farming Guidance';
        if (messageTextarea) {
          messageTextarea.value = 'I would like to connect with a farming expert.';
          messageTextarea.focus();
        }
      });
    });
  }

  var faqQuestions = document.querySelectorAll('.kv-faq__question');

  function closeFaqItem(item) {
    var btn = item.querySelector('.kv-faq__question');
    var answer = item.querySelector('.kv-faq__answer');
    item.classList.remove('is-active');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (answer) answer.style.maxHeight = '0px';
  }

  function openFaqItem(item) {
    var btn = item.querySelector('.kv-faq__question');
    var answer = item.querySelector('.kv-faq__answer');
    item.classList.add('is-active');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
  }

  if (faqQuestions && faqQuestions.length) {
    faqQuestions.forEach(function (q) {
      q.addEventListener('click', function () {
        var item = q.closest('.kv-faq__item');
        if (!item) return;

        var isActive = item.classList.contains('is-active');
        var allItems = document.querySelectorAll('.kv-faq__item');
        allItems.forEach(function (it) { closeFaqItem(it); });
        if (!isActive) openFaqItem(item);
      });
    });
  }

  var form = document.querySelector('[data-testid="contact-form"]');
  var nameInput = document.querySelector('[data-testid="form-name"]');
  var emailInput = document.querySelector('[data-testid="form-email"]');
  var successBox = document.querySelector('[data-testid="form-success"]');

  var errorName = document.querySelector('[data-testid="error-name"]');
  var errorEmail = document.querySelector('[data-testid="error-email"]');
  var errorSubject = document.querySelector('[data-testid="error-subject"]');
  var errorMessage = document.querySelector('[data-testid="error-message"]');

  function setError(el, msg) {
    if (!el) return;
    el.textContent = msg || '';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      if (successBox) {
        successBox.textContent = '';
        successBox.classList.remove('is-visible');
      }

      var name = nameInput ? String(nameInput.value || '').trim() : '';
      var email = emailInput ? String(emailInput.value || '').trim() : '';
      var subject = subjectSelect ? String(subjectSelect.value || '').trim() : '';
      var message = messageTextarea ? String(messageTextarea.value || '').trim() : '';

      var hasError = false;

      if (!name) {
        setError(errorName, (window.kvTranslateText ? window.kvTranslateText("Please enter your name.") : "Please enter your name."));
        hasError = true;
      } else {
        setError(errorName, '');
      }

      if (!email) {
        setError(errorEmail, (window.kvTranslateText ? window.kvTranslateText("Please enter your email.") : "Please enter your email."));
        hasError = true;
      } else if (!isValidEmail(email)) {
        setError(errorEmail, (window.kvTranslateText ? window.kvTranslateText("Please enter a valid email address.") : "Please enter a valid email address."));
        hasError = true;
      } else {
        setError(errorEmail, '');
      }

      if (!subject) {
        setError(errorSubject, (window.kvTranslateText ? window.kvTranslateText("Please select a subject.") : "Please select a subject."));
        hasError = true;
      } else {
        setError(errorSubject, '');
      }

      if (!message) {
        setError(errorMessage, (window.kvTranslateText ? window.kvTranslateText("Please write your message.") : "Please write your message."));
        hasError = true;
      } else {
        setError(errorMessage, '');
      }

      if (hasError) return;

      try {
        var response = await fetch('/contact', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name: name, email: email, message: message})});
        var data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Unable to send your message.');
        if (successBox) {
          successBox.textContent = data.message || 'Thank you! Your message has been received.';
          successBox.classList.add('is-visible');
        }
        form.reset();
      } catch (error) {
        setError(errorMessage, error.message || 'Unable to send your message.');
      }
    });
  }
})();
