/* ============================================================
   CONTACT FORM — Validation, file upload preview, submission
   ============================================================ */

(function () {
  'use strict';

  // ── Field validators ──────────────────────────────────────
  const validators = {
    required: v => v.trim() !== '',
    email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    tel:      v => v.replace(/\D/g, '').length >= 7,
  };

  function getError(input) {
    const val = input.value;
    if (input.required && !validators.required(val))   return 'This field is required.';
    if (input.type === 'email' && val && !validators.email(val)) return 'Please enter a valid email address.';
    if (input.type === 'tel'   && val && !validators.tel(val))   return 'Please enter a valid phone number.';
    return null;
  }

  // ── Show / clear field error ──────────────────────────────
  function setError(group, msg) {
    group.classList.toggle('has-error', !!msg);
    const errEl = group.querySelector('.form-error-msg');
    if (errEl) errEl.textContent = msg || '';
  }

  function validateField(input) {
    const group = input.closest('.form-group');
    if (!group) return true;
    const err = getError(input);
    setError(group, err);
    return !err;
  }

  // ── Validate radio group (at least one selected) ──────────
  function validateRadioGroup(name, container) {
    const selected = container.querySelector(`input[name="${name}"]:checked`);
    const group    = container.querySelector(`[data-radio-group="${name}"]`);
    if (!group) return true;
    const msg = selected ? null : 'Please select an option.';
    setError(group, msg);
    return !!selected;
  }

  // ── File upload label update ──────────────────────────────
  function initFileUpload() {
    const input = document.querySelector('.file-upload input[type="file"]');
    const label = document.querySelector('.file-upload__text');
    if (!input || !label) return;

    input.addEventListener('change', () => {
      const count = input.files.length;
      label.innerHTML = count
        ? `<strong>${count} file${count > 1 ? 's' : ''} selected</strong>`
        : 'Drop files here or <strong>click to browse</strong>';
    });

    // Make whole zone clickable
    const zone = document.querySelector('.file-upload');
    if (zone) zone.addEventListener('click', () => input.click());
  }

  // ── Full form validation ──────────────────────────────────
  function validateForm(form) {
    let valid = true;

    form.querySelectorAll('input[required], select[required], textarea[required]').forEach(input => {
      if (!validateField(input)) valid = false;
    });

    // Validate required radio groups
    form.querySelectorAll('[data-required-radio]').forEach(name => {
      if (!validateRadioGroup(name.dataset.requiredRadio, form)) valid = false;
    });

    return valid;
  }

  // ── Form submit ───────────────────────────────────────────
  function initForm() {
    const form    = document.getElementById('inspection-form');
    const success = document.getElementById('form-success');
    const submitBtn = form && form.querySelector('[type="submit"]');
    if (!form) return;

    // Inline validation on blur
    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('blur', () => validateField(input));
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validateForm(form)) {
        form.querySelector('.has-error input, .has-error select, .has-error textarea')?.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        const data = new FormData(form);
        const res  = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' },
        });

        if (res.ok) {
          form.style.display = 'none';
          if (success) success.style.display = 'block';
        } else {
          throw new Error('Server error');
        }
      } catch {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request Inspection';
        alert('Something went wrong. Please try again or call us directly.');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initFileUpload();
    initForm();
  });
})();
