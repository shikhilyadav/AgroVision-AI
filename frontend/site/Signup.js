document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     ELEMENTS
     ========================================================= */

  var form = document.getElementById("signupForm");

  var fullName = document.getElementById("fullName");

  var mobile = document.getElementById("mobile");

  var email = document.getElementById("email");

  var password = document.getElementById("password");

  var confirmPassword =
    document.getElementById("confirmPassword");

  var message =
    document.getElementById("formMessage");

  var button =
    document.getElementById("signupButton");


  /* =========================================================
     SAFETY CHECK
     ========================================================= */

  if (!form || !fullName || !mobile || !email ||
      !password || !confirmPassword || !message || !button) {

    console.error(
      "Signup page elements are missing."
    );

    return;
  }


  /* =========================================================
     TRANSLATION HELPER
     ========================================================= */

  function text(key, fallback) {

    return window.kvTranslateText
      ? window.kvTranslateText(key)
      : fallback;

  }


  /* =========================================================
     ERROR HELPER
     ========================================================= */

  function setError(id, value) {

    var element =
      document.getElementById(id);

    if (element) {
      element.textContent = value || "";
    }

  }


  /* =========================================================
     CLEAR ALL ERRORS
     ========================================================= */

  function clearErrors() {

    setError(
      "fullNameError",
      ""
    );

    setError(
      "mobileError",
      ""
    );

    setError(
      "emailError",
      ""
    );

    setError(
      "passwordError",
      ""
    );

    setError(
      "confirmPasswordError",
      ""
    );

  }


  /* =========================================================
     RESET MESSAGE
     ========================================================= */

  function clearMessage() {

    message.textContent = "";

    message.className =
      "form-message";

  }


  /* =========================================================
     PASSWORD TOGGLE
     ========================================================= */

  function togglePassword(
    inputId,
    buttonId
  ) {

    var inputEl =
      document.getElementById(inputId);

    var buttonEl =
      document.getElementById(buttonId);


    if (!inputEl || !buttonEl) {
      return;
    }


    buttonEl.addEventListener(
      "click",
      function () {

        var showing =
          inputEl.type === "text";


        inputEl.type =
          showing
            ? "password"
            : "text";


        buttonEl.innerHTML =
          showing
            ? '<i class="fa-regular fa-eye"></i>'
            : '<i class="fa-regular fa-eye-slash"></i>';


        buttonEl.setAttribute(
          "aria-label",
          showing
            ? "Show password"
            : "Hide password"
        );

      }
    );

  }


  togglePassword(
    "password",
    "eyeToggle"
  );


  togglePassword(
    "confirmPassword",
    "confirmEyeToggle"
  );


  /* =========================================================
     MOBILE INPUT
     ========================================================= */

  mobile.addEventListener(
    "input",
    function () {

      /* Only digits */

      this.value =
        this.value.replace(
          /\D/g,
          ""
        );


      /* Maximum 10 digits */

      if (this.value.length > 10) {

        this.value =
          this.value.slice(
            0,
            10
          );

      }

    }
  );


  /* =========================================================
     FORM SUBMIT
     ========================================================= */

  form.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      /* -----------------------------------------------------
         RESET
         ----------------------------------------------------- */

      clearErrors();

      clearMessage();


      var valid = true;


      /* -----------------------------------------------------
         GET VALUES
         ----------------------------------------------------- */

      var nameValue =
        fullName.value.trim();

      var mobileValue =
        mobile.value.trim();

      var emailValue =
        email.value.trim();

      var passwordValue =
        password.value;

      var confirmPasswordValue =
        confirmPassword.value;


      /* =====================================================
         NAME VALIDATION
         ===================================================== */

      if (!nameValue) {

        setError(
          "fullNameError",
          text(
            "Please enter your full name.",
            "Please enter your full name."
          )
        );

        valid = false;

      }


      /* =====================================================
         MOBILE VALIDATION
         ===================================================== */

      if (!mobileValue) {

        setError(
          "mobileError",
          text(
            "Please enter your mobile number.",
            "Please enter your mobile number."
          )
        );

        valid = false;

      } else if (
        !/^[0-9]{10}$/.test(
          mobileValue
        )
      ) {

        setError(
          "mobileError",
          text(
            "Please enter a valid 10-digit mobile number.",
            "Please enter a valid 10-digit mobile number."
          )
        );

        valid = false;

      }


      /* =====================================================
         EMAIL VALIDATION
         ===================================================== */

      if (!emailValue) {

        setError(
          "emailError",
          text(
            "Please enter your email address.",
            "Please enter your email address."
          )
        );

        valid = false;

      } else if (
        !email.validity.valid
      ) {

        setError(
          "emailError",
          text(
            "Please enter a valid email address.",
            "Please enter a valid email address."
          )
        );

        valid = false;

      }


      /* =====================================================
         PASSWORD VALIDATION
         ===================================================== */

      if (!passwordValue) {

        setError(
          "passwordError",
          text(
            "Please enter a password.",
            "Please enter a password."
          )
        );

        valid = false;

      } else if (
        passwordValue.length < 8
      ) {

        setError(
          "passwordError",
          text(
            "Password must be at least 8 characters.",
            "Password must be at least 8 characters."
          )
        );

        valid = false;

      }


      /* =====================================================
         CONFIRM PASSWORD
         ===================================================== */

      if (!confirmPasswordValue) {

        setError(
          "confirmPasswordError",
          text(
            "Please confirm your password.",
            "Please confirm your password."
          )
        );

        valid = false;

      } else if (
        confirmPasswordValue !==
        passwordValue
      ) {

        setError(
          "confirmPasswordError",
          text(
            "Passwords do not match.",
            "Passwords do not match."
          )
        );

        valid = false;

      }


      /* =====================================================
         STOP IF INVALID
         ===================================================== */

      if (!valid) {
        return;
      }


      /* =====================================================
         LOADING STATE
         ===================================================== */

      button.disabled = true;

      button.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> ' +
        text(
          "Creating Account…",
          "Creating Account…"
        );


      try {

        /* ===================================================
           SEND DATA TO BACKEND
           =================================================== */

        var response =
          await fetch(
            API_BASE_URL + "/register",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                name:
                  nameValue,

                mobile:
                  mobileValue,

                email:
                  emailValue,

                password:
                  passwordValue

              })

            }
          );


        /* ===================================================
           READ RESPONSE
           =================================================== */

        var result = {};

        try {

          result =
            await response.json();

        } catch (jsonError) {

          result = {};

        }


        console.log(
          "Registration response:",
          result
        );


        /* ===================================================
           BACKEND ERROR
           =================================================== */

        if (!response.ok) {

          var backendMessage =
            result.detail ||
            result.message ||
            "Registration failed. Please try again.";

          throw new Error(
            backendMessage
          );

        }


        /* ===================================================
           SUCCESS
           =================================================== */

        message.className =
          "form-message success";


        message.textContent =
          result.message ||
          text(
            "Account created successfully. Redirecting to login...",
            "Account created successfully. Redirecting to login..."
          );


        /* ===================================================
           CLEAR FORM
           =================================================== */

        form.reset();


        /* ===================================================
           REDIRECT
           =================================================== */

        setTimeout(
          function () {

            window.location.href =
              "login.html";

          },
          1200
        );


      } catch (error) {

        console.error(
          "Signup error:",
          error
        );


        /* =================================================
           ERROR MESSAGE
           ================================================= */

        message.className =
          "form-message error";


        message.textContent =
          error.message ||
          text(
            "Something went wrong. Please try again.",
            "Something went wrong. Please try again."
          );


      } finally {

        /* =================================================
           RESTORE BUTTON
           ================================================= */

        button.disabled =
          false;


        button.innerHTML =
          text(
            "Create Account",
            "Create Account"
          ) +
          ' <i class="fa-solid fa-arrow-right"></i>';

      }

    }
  );

});
