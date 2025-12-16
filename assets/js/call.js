// ===============================
// Call Availability Logic
// ===============================

function isBusinessHours() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 6 = Sat
  const hour = now.getHours();

  const isWeekday = day >= 1 && day <= 5;
  const isWorkingHour = hour >= 9 && hour < 18;

  return isWeekday && isWorkingHour;
}

// ===============================
// Call Click Tracking
// ===============================

function handleCallClick() {
  if (window.callLogged) return;
  window.callLogged = true;

  const status = isBusinessHours() ? 'Business Hours' : 'After Hours / Emergency';

  const callLog = {
    type: 'call',
    time: new Date().toLocaleString(),
    status: status
  };

  const logs = JSON.parse(localStorage.getItem('adminLogs')) || [];
  logs.push(callLog);
  localStorage.setItem('adminLogs', JSON.stringify(logs));
}


// ===============================
// UI Messaging
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  const callNote = document.getElementById('call-status-note');

  if (!callNote) return;

  if (isBusinessHours()) {
    callNote.textContent = 'Available during business hours';
    callNote.classList.add('status-open');
  } else {
    callNote.textContent = 'Emergency calls only (after hours)';
    callNote.classList.add('status-emergency');
  }
});



