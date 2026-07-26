// ============================================================
// DEMO ONLY — no real backend
// ------------------------------------------------------------
// This file uses the browser's localStorage as a stand-in
// database so the registration/login flow behaves correctly
// while you click through the design. It is NOT secure and NOT
// suitable for a real launch:
//   - passwords are stored in plain text, in the visitor's own
//     browser, not on a server
//   - it only works on the same browser/device that registered
//     — it will not work across different computers or for
//     real students at scale
// Replace this with a real backend (server + database, hashed
// passwords, session/token-based login) before going live.
// ============================================================

const DS_STUDENTS_KEY = 'dsStudents';

function dsGetStudents() {
  try {
    return JSON.parse(localStorage.getItem(DS_STUDENTS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function dsSaveStudents(students) {
  localStorage.setItem(DS_STUDENTS_KEY, JSON.stringify(students));
}

function dsFindStudentByIdentifier(identifier) {
  const value = identifier.trim().toLowerCase();
  return dsGetStudents().find(function (s) {
    return s.email.toLowerCase() === value || s.matricNumber.toLowerCase() === value;
  });
}

// ============================================================
// Password show/hide toggle
// ============================================================
(function () {
  document.querySelectorAll('.input-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      const showing = input.type === 'text';
      input.type = showing ? 'password' : 'text';

      const eyeOpen = btn.querySelector('.icon-eye-open');
      const eyeClosed = btn.querySelector('.icon-eye-closed');
      if (eyeOpen && eyeClosed) {
        eyeOpen.style.display = showing ? '' : 'none';
        eyeClosed.style.display = showing ? 'none' : '';
      }
    });
  });
})();

// ============================================================
// Login form
// ============================================================
(function () {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const role = document.body.getAttribute('data-auth-role'); // "student" or "staff"
  const errorBanner = document.getElementById('loginError');
  const errorText = document.getElementById('loginErrorText');
  const successBanner = document.getElementById('loginSuccess');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (errorBanner) errorBanner.classList.remove('show');

    let valid = true;
    form.querySelectorAll('[required]').forEach(function (field) {
      const group = field.closest('.form-group');
      if (!field.value.trim()) {
        valid = false;
        if (group) group.classList.add('has-error');
      } else if (group) {
        group.classList.remove('has-error');
      }
    });

    if (!valid) return;

    const idField = document.getElementById('loginId');
    const passwordField = document.getElementById('loginPassword');

    if (role === 'student') {
      const student = dsFindStudentByIdentifier(idField.value);

      if (!student) {
        if (errorText) errorText.textContent = "We couldn't find an account with that matric number or email. Have you registered yet?";
        if (errorBanner) errorBanner.classList.add('show');
        return;
      }

      if (student.password !== passwordField.value) {
        if (errorText) errorText.textContent = 'Incorrect password. Please try again.';
        if (errorBanner) errorBanner.classList.add('show');
        return;
      }

      if (successBanner) successBanner.classList.add('show');
      setTimeout(function () {
        window.location.href = 'student-dashboard.html';
      }, 1200);

    } else {
      // Staff: no real staff directory in this demo — accept any
      // filled-in credentials and go straight to the console.
      if (successBanner) successBanner.classList.add('show');
      setTimeout(function () {
        window.location.href = 'admin-dashboard.html';
      }, 1200);
    }
  });
})();

// ============================================================
// Registration form — duplicate check + "account creation"
// ============================================================
(function () {
  const form = document.getElementById('registerForm');
  if (!form) return;

  const errorBanner = document.getElementById('registerError');
  const errorText = document.getElementById('registerErrorText');
  const successBanner = document.getElementById('registerSuccess');

  const password = document.getElementById('regPassword');
  const confirm = document.getElementById('regConfirmPassword');

  function checkPasswordMatch() {
    if (!password || !confirm || !confirm.value) return true;
    const group = confirm.closest('.form-group');
    if (password.value !== confirm.value) {
      if (group) group.classList.add('has-error');
      return false;
    }
    if (group) group.classList.remove('has-error');
    return true;
  }

  if (confirm) confirm.addEventListener('input', checkPasswordMatch);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (errorBanner) errorBanner.classList.remove('show');

    let valid = true;
    form.querySelectorAll('[required]').forEach(function (field) {
      const group = field.closest('.form-group');
      const empty = field.type === 'checkbox' ? !field.checked : !field.value.trim();
      if (empty) {
        valid = false;
        if (group) group.classList.add('has-error');
      } else if (group && field.id !== 'regConfirmPassword') {
        group.classList.remove('has-error');
      }
    });

    if (!checkPasswordMatch()) valid = false;
    if (!valid) return;

    const emailField = document.getElementById('regEmail');
    const matricField = document.getElementById('matricNumber');

    const existing = dsGetStudents();
    const duplicate = existing.find(function (s) {
      return s.email.toLowerCase() === emailField.value.trim().toLowerCase() ||
             s.matricNumber.toLowerCase() === matricField.value.trim().toLowerCase();
    });

    if (duplicate) {
      const sameEmail = duplicate.email.toLowerCase() === emailField.value.trim().toLowerCase();
      if (errorText) {
        errorText.textContent = sameEmail
          ? 'An account with this email address already exists. Try signing in instead.'
          : 'An account with this matric number already exists. Try signing in instead.';
      }
      if (errorBanner) errorBanner.classList.add('show');
      document.getElementById(sameEmail ? 'regEmail' : 'matricNumber').closest('.form-group').classList.add('has-error');
      return;
    }

    existing.push({
      fullName: document.getElementById('fullName').value.trim(),
      email: emailField.value.trim(),
      phone: document.getElementById('phone').value.trim(),
      matricNumber: matricField.value.trim(),
      level: document.getElementById('level').value,
      programme: document.getElementById('programme').value,
      password: password.value
    });
    dsSaveStudents(existing);

    if (successBanner) successBanner.classList.add('show');
    form.reset();

    setTimeout(function () {
      window.location.href = 'login.html';
    }, 1500);
  });
})();