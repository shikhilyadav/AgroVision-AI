/* ============================================================
   Kisan Vision — Login Page
   Backend connected login + JWT authentication
   ============================================================ */

(function () {

  'use strict';


  // ============================================================
  // CONFIGURATION
  // ============================================================

  var API_BASE_URL = 'http://127.0.0.1:8000';

  var EMAIL_PATTERN =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


  // ============================================================
  // HELPERS
  // ============================================================

  function isValidEmail(value) {

    return EMAIL_PATTERN.test(
      value.trim()
    );

  }


  function translate(text) {

    return window.kvTranslateText
      ? window.kvTranslateText(text)
      : text;

  }


  // ============================================================
  // MOBILE NAVIGATION
  // ============================================================

  var hamburger =
    document.getElementById('hamburger');

  var navLinks =
    document.getElementById('navLinks');


  if (hamburger && navLinks) {

    hamburger.addEventListener(
      'click',
      function () {

        var isOpen =
          navLinks.classList.toggle('open');

        hamburger.classList.toggle(
          'open',
          isOpen
        );

        hamburger.setAttribute(
          'aria-label',
          isOpen
            ? translate('Close menu')
            : translate('Open menu')
        );

      }
    );


    navLinks.addEventListener(
      'click',
      function (event) {

        if (
          event.target.closest('.nav-link')
        ) {

          navLinks.classList.remove(
            'open'
          );

          hamburger.classList.remove(
            'open'
          );

        }

      }
    );

  }


  // ============================================================
  // PASSWORD SHOW / HIDE
  // ============================================================

  var eyeToggle =
    document.getElementById('eyeToggle');

  var passwordInput =
    document.getElementById('password');


  if (eyeToggle && passwordInput) {

    eyeToggle.addEventListener(
      'click',
      function () {

        var showing =
          passwordInput.type === 'text';

        passwordInput.type =
          showing
            ? 'password'
            : 'text';

        eyeToggle.innerHTML =
          showing
            ? '<i class="fa-regular fa-eye"></i>'
            : '<i class="fa-regular fa-eye-slash"></i>';

        eyeToggle.setAttribute(
          'aria-label',
          showing
            ? 'Show password'
            : 'Hide password'
        );

      }
    );

  }


  // ============================================================
  // LOGIN FORM
  // ============================================================

  var loginForm =
    document.getElementById('loginForm');

  var emailInput =
    document.getElementById('email');

  var emailError =
    document.getElementById('emailError');

  var passwordError =
    document.getElementById('passwordError');

  var formMessage =
    document.getElementById('formMessage');

  var loginButton =
    document.getElementById('loginButton');


  function setFieldError(
    input,
    errorEl,
    message
  ) {

    errorEl.textContent =
      message;

    input
      .closest('.input-wrap')
      .classList.toggle(
        'invalid',
        Boolean(message)
      );

  }


  function showFormMessage(
    text,
    type
  ) {

    formMessage.textContent =
      text;

    formMessage.className =
      'form-message' +
      (type
        ? ' ' + type
        : '');

  }


  emailInput.addEventListener(
    'input',
    function () {

      setFieldError(
        emailInput,
        emailError,
        ''
      );

      showFormMessage(
        '',
        ''
      );

    }
  );


  passwordInput.addEventListener(
    'input',
    function () {

      setFieldError(
        passwordInput,
        passwordError,
        ''
      );

      showFormMessage(
        '',
        ''
      );

    }
  );


  // ============================================================
  // REAL BACKEND LOGIN
  // ============================================================

  loginForm.addEventListener(
    'submit',
    async function (event) {

      event.preventDefault();


      var email =
        emailInput.value.trim();

      var password =
        passwordInput.value;

      var valid = true;


      // --------------------------------------------------------
      // EMAIL VALIDATION
      // --------------------------------------------------------

      if (!email) {

        setFieldError(
          emailInput,
          emailError,
          translate(
            'Please enter your email address.'
          )
        );

        valid = false;

      }

      else if (
        !isValidEmail(email)
      ) {

        setFieldError(
          emailInput,
          emailError,
          translate(
            'Please enter a valid email address.'
          )
        );

        valid = false;

      }

      else {

        setFieldError(
          emailInput,
          emailError,
          ''
        );

      }


      // --------------------------------------------------------
      // PASSWORD VALIDATION
      // --------------------------------------------------------

      if (!password) {

        setFieldError(
          passwordInput,
          passwordError,
          translate(
            'Please enter your password.'
          )
        );

        valid = false;

      }

      else if (
        password.length < 8
      ) {

        setFieldError(
          passwordInput,
          passwordError,
          translate(
            'Password must be at least 8 characters.'
          )
        );

        valid = false;

      }

      else {

        setFieldError(
          passwordInput,
          passwordError,
          ''
        );

      }


      if (!valid) {

        showFormMessage(
          '',
          ''
        );

        return;

      }


      // --------------------------------------------------------
      // LOADING STATE
      // --------------------------------------------------------

      loginButton.disabled = true;

      loginButton.innerHTML =
        translate(
          'Logging in…'
        ) +
        ' <i class="fa-solid fa-spinner fa-spin"></i>';

      showFormMessage(
        '',
        ''
      );


      try {

        // ------------------------------------------------------
        // SEND LOGIN REQUEST
        // ------------------------------------------------------

        var response =
          await fetch(
            API_BASE_URL + '/login',
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json'
              },

              body: JSON.stringify({

                identifier:
                  email,

                password:
                  password

              })

            }
          );


        var result;


        try {

          result =
            await response.json();

        }

        catch (jsonError) {

          result = {};

        }


        // ------------------------------------------------------
        // LOGIN FAILED
        // ------------------------------------------------------

        if (!response.ok) {

          var errorMessage =
            result.detail ||
            translate(
              'Invalid email or password.'
            );

          throw new Error(
            errorMessage
          );

        }


        // ------------------------------------------------------
        // LOGIN SUCCESSFUL
        // ------------------------------------------------------

        if (result.success) {


          // ----------------------------------------------------
          // SAVE USER INFORMATION
          // ----------------------------------------------------

          if (result.user) {

            localStorage.setItem(
              'kisanVisionUser',
              JSON.stringify(
                result.user
              )
            );

          }


          // ----------------------------------------------------
          // SAVE JWT TOKEN
          // ----------------------------------------------------

          if (result.token) {

            localStorage.setItem(
              'kisanVisionToken',
              result.token
            );

            console.log(
              'KisanVision JWT token saved successfully.'
            );

          }


          // ----------------------------------------------------
          // SUCCESS MESSAGE
          // ----------------------------------------------------

          showFormMessage(
            translate(
              'Login successful!'
            ),
            'success'
          );


          // ----------------------------------------------------
          // REDIRECT AFTER LOGIN
          // ----------------------------------------------------

          setTimeout(
            function () {

              window.location.href =
                'windows.html';

            },
            700
          );

          return;

        }


        throw new Error(
          translate(
            'Login failed. Please try again.'
          )
        );

      }


      catch (error) {

        console.error(
          'Login error:',
          error
        );


        var message =
          error.message;


        // ------------------------------------------------------
        // NETWORK / BACKEND UNAVAILABLE
        // ------------------------------------------------------

        if (
          error instanceof TypeError ||
          message === 'Failed to fetch'
        ) {

          message =
            translate(
              'Unable to connect to the server. Please make sure KisanVision backend is running.'
            );

        }


        showFormMessage(
          message,
          'error'
        );


        loginButton.disabled =
          false;

        loginButton.innerHTML =
          translate(
            'Login'
          ) +
          ' <i class="fa-solid fa-arrow-right"></i>';

      }

    }
  );


  // ============================================================
  // SIGN UP NAVIGATION
  // ============================================================

  var signupLink =
    document.getElementById(
      'signupLink'
    );


  if (signupLink) {

    signupLink.addEventListener(
      'click',
      function (event) {

        event.preventDefault();

        window.location.href =
          'register.html';

      }
    );

  }


  // ============================================================
  // NEWSLETTER VALIDATION
  // ============================================================

  var newsletterForm =
    document.getElementById(
      'newsletterForm'
    );

  var newsletterEmail =
    document.getElementById(
      'newsletterEmail'
    );

  var newsletterMsg =
    document.getElementById(
      'newsletterMsg'
    );


  if (
    newsletterForm &&
    newsletterEmail &&
    newsletterMsg
  ) {

    newsletterForm.addEventListener(
      'submit',
      function (event) {

        event.preventDefault();


        var email =
          newsletterEmail.value.trim();


        if (!email) {

          newsletterMsg.textContent =
            translate(
              'Please enter your email address.'
            );

          newsletterMsg.className =
            'newsletter-msg error';

          return;

        }


        if (!isValidEmail(email)) {

          newsletterMsg.textContent =
            translate(
              'Please enter a valid email address.'
            );

          newsletterMsg.className =
            'newsletter-msg error';

          return;

        }


        newsletterMsg.textContent =
          translate(
            'Thank you for subscribing!'
          );

        newsletterMsg.className =
          'newsletter-msg success';

        newsletterEmail.value =
          '';

      }
    );

  }


})();