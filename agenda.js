function renderAgenda() {
  const container = document.getElementById('agendaListContainer');
  if (!container) return;

  const cycle = state.cycles[state.currentCycle];
  const pendingBadge = document.getElementById('agendaPendingBadge');
  const bnAgendaBadge = document.getElementById('bnAgendaBadge');

  if (!cycle) {
    container.innerHTML = '<div style="color:var(--muted); font-size:13px; text-align:center; padding:30px;">Crea un ciclo para usar la agenda.</div>';
    if(pendingBadge) pendingBadge.style.display = 'none';
    if(bnAgendaBadge) bnAgendaBadge.style.display = 'none';
    return;
  }

  const tasks = cycle.agendaTasks || [];
  
  // Update badges
  const pendingCount = tasks.filter(t => !t.done).length;
  if (pendingBadge) {
    pendingBadge.textContent = `${pendingCount} pendiente${pendingCount!==1?'s':''}`;
    pendingBadge.style.display = pendingCount > 0 ? '' : 'none';
  }
  if (bnAgendaBadge) {
    bnAgendaBadge.style.display = pendingCount > 0 ? 'block' : 'none';
  }

  // Filter tasks
  const filter = state.agendaFilter || 'all';
  let filtered = tasks;
  if (filter === 'pending') filtered = tasks.filter(t => !t.done);
  else if (filter === 'done') filtered = tasks.filter(t => t.done);
  else if (filter === 'exam') filtered = tasks.filter(t => t.category === 'examen');
  else if (filter === 'task') filtered = tasks.filter(t => t.category === 'tarea' || t.category === 'proyecto');

  // Sort by due date (closest first), then by done status
  filtered.sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate + 'T' + (a.dueTime||'23:59')) - new Date(b.dueDate + 'T' + (b.dueTime||'23:59'));
  });

  if (filtered.length === 0) {
    container.innerHTML = '<div style="color:var(--muted); font-size:13px; text-align:center; padding:30px;">No hay tareas que coincidan con el filtro.</div>';
    return;
  }

  const getCatIcon = (cat) => {
    if (cat==='tarea') return '📝';
    if (cat==='examen') return '📑';
    if (cat==='proyecto') return '💼';
    if (cat==='lectura') return '📖';
    return '📌';
  };

  const getCourseData = (cid) => {
    return (cycle.courses || []).find(c => c.id === cid) || { name: 'Curso eliminado', color: '#888' };
  };

  container.innerHTML = filtered.map(t => {
    const c = getCourseData(t.courseId);
    let dateStr = '';
    let isOverdue = false;
    
    if (t.dueDate) {
      const d = new Date(t.dueDate + 'T' + (t.dueTime || '23:59'));
      const today = new Date();
      isOverdue = !t.done && d < today;
      dateStr = d.toLocaleDateString('es-ES', { weekday:'short', day:'numeric', month:'short' }) + (t.dueTime ? ', ' + t.dueTime : '');
    }

    return `
      <div class="agenda-card ${t.done ? 'completed' : ''}" onclick="openAgendaTaskSheet('${t.id}')" style="cursor:pointer;">
        <button type="button" class="agenda-check-btn" onclick="event.stopPropagation(); toggleAgendaTask('${t.id}')">
          ${t.done ? '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
        </button>
        <div style="flex:1; min-width:0;">
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px; flex-wrap:wrap;">
            <span style="font-size:10px; font-weight:700; color:${c.color}; background:${c.color}22; padding:2px 6px; border-radius:4px; max-width:120px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${c.name}</span>
            <span style="font-size:12px;" title="Categoría">${getCatIcon(t.category)}</span>
            ${dateStr ? `<span style="font-size:10.5px; font-weight:600; color:${isOverdue ? 'var(--red)' : 'var(--muted)'}; margin-left:auto;">
              ${isOverdue ? '⚠️ ' : ''}${dateStr}
            </span>` : ''}
          </div>
          <div style="font-size:13.5px; font-weight:600; color:var(--text); line-height:1.3; margin-bottom:${t.notes ? '4px' : '0'}; text-decoration:${t.done ? 'line-through' : 'none'};">${t.title}</div>
          ${t.notes ? `<div style="font-size:11px; color:var(--muted); line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${t.notes}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function setAgendaFilter(filter) {
  state.agendaFilter = filter;
  document.querySelectorAll('.agenda-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderAgenda();
  saveState();
}

function toggleAgendaTask(taskId) {
  const cycle = state.cycles[state.currentCycle];
  if (!cycle || !cycle.agendaTasks) return;
  const task = cycle.agendaTasks.find(t => t.id === taskId);
  if (task) {
    task.done = !task.done;
    renderAgenda();
    saveState();
  }
}

function openAgendaTaskSheet(taskId = null) {
  const cycle = state.cycles[state.currentCycle];
  if (!cycle) {
    showToast('Crea un curso primero.', 'error');
    return;
  }
  
  const cs = courses();
  if (cs.length === 0) {
    showToast('Añade cursos antes de crear tareas.', 'error');
    return;
  }

  const sel = document.getElementById('agendaTaskCourse');
  sel.innerHTML = cs.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

  document.getElementById('agendaEditingTaskId').value = taskId || '';
  
  const titleEl = document.getElementById('agendaTaskSheetTitle');
  const btnDel = document.getElementById('btnDeleteAgendaTask');

  if (taskId) {
    const task = (cycle.agendaTasks || []).find(t => t.id === taskId);
    if (task) {
      titleEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
      <span>Editar Entrega</span>`;
      document.getElementById('agendaTaskTitle').value = task.title || '';
      document.getElementById('agendaTaskCourse').value = task.courseId || cs[0].id;
      document.getElementById('agendaTaskCategory').value = task.category || 'tarea';
      document.getElementById('agendaTaskDueDate').value = task.dueDate || '';
      document.getElementById('agendaTaskDueTime').value = task.dueTime || '23:59';
      document.getElementById('agendaTaskNotes').value = task.notes || '';
      btnDel.style.display = 'inline-block';
    }
  } else {
    titleEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>
    <span>Nueva Entrega / Tarea</span>`;
    document.getElementById('agendaTaskTitle').value = '';
    if(cs.length > 0) document.getElementById('agendaTaskCourse').value = cs[0].id;
    document.getElementById('agendaTaskCategory').value = 'tarea';
    document.getElementById('agendaTaskDueDate').value = '';
    document.getElementById('agendaTaskDueTime').value = '23:59';
    document.getElementById('agendaTaskNotes').value = '';
    btnDel.style.display = 'none';
  }

  openSheet('agendaTaskSheet');
}

function saveAgendaTask() {
  const cycle = state.cycles[state.currentCycle];
  if (!cycle) return;
  if (!cycle.agendaTasks) cycle.agendaTasks = [];

  const taskId = document.getElementById('agendaEditingTaskId').value;
  const title = sanitizeText(document.getElementById('agendaTaskTitle').value);
  if (!title) { showToast('El título es requerido', 'error'); return; }

  const taskData = {
    title: title,
    courseId: document.getElementById('agendaTaskCourse').value,
    category: document.getElementById('agendaTaskCategory').value,
    dueDate: document.getElementById('agendaTaskDueDate').value,
    dueTime: document.getElementById('agendaTaskDueTime').value,
    notes: sanitizeText(document.getElementById('agendaTaskNotes').value),
  };

  if (taskId) {
    const task = cycle.agendaTasks.find(t => t.id === taskId);
    if (task) Object.assign(task, taskData);
  } else {
    taskData.id = 'task_' + Math.random().toString(36).substr(2, 9);
    taskData.done = false;
    cycle.agendaTasks.push(taskData);
  }

  closeSheet('agendaTaskSheet');
  renderAgenda();
  saveState();
  showToast(taskId ? 'Tarea actualizada' : 'Tarea guardada');
}

function deleteCurrentEditingTask() {
  const taskId = document.getElementById('agendaEditingTaskId').value;
  if (!taskId) return;
  const cycle = state.cycles[state.currentCycle];
  if (!cycle || !cycle.agendaTasks) return;
  
  if (confirm('¿Eliminar esta tarea?')) {
    cycle.agendaTasks = cycle.agendaTasks.filter(t => t.id !== taskId);
    closeSheet('agendaTaskSheet');
    renderAgenda();
    saveState();
    showToast('Tarea eliminada');
  }
}

function exportScheduleToICS() {
  const cs = courses();
  if (cs.length === 0) {
    showToast('No hay cursos para exportar', 'error');
    return;
  }

  let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Promedia//Horario//ES\nCALSCALE:GREGORIAN\n";
  const cycleDates = getDefaultCycleDates(state.currentCycle);
  
  // Fechas del ciclo
  const sDate = new Date(cycleDates.startDate + 'T00:00:00');
  const eDate = new Date(cycleDates.endDate + 'T23:59:59');
  const endStr = eDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  // Días de la semana para RRULE de iCal
  const mapDayICal = { 'L': 'MO', 'M': 'TU', 'X': 'WE', 'J': 'TH', 'V': 'FR', 'S': 'SA', 'D': 'SU' };

  let eventsAdded = 0;

  cs.forEach(c => {
    if (!c.schedule || c.schedule.length === 0) return;
    
    c.schedule.forEach(sc => {
      // Find the first occurrence of this day after the start date
      const daysOrder = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
      const targetDay = daysOrder.indexOf(sc.day);
      let curr = new Date(sDate);
      while (curr.getDay() !== targetDay) {
        curr.setDate(curr.getDate() + 1);
      }

      // Format YYYYMMDD
      const dateStr = curr.toISOString().split('T')[0].replace(/-/g, '');
      const tStart = sc.start.replace(':', '') + '00';
      const tEnd = sc.end.replace(':', '') + '00';

      const icalDay = mapDayICal[sc.day];
      
      const evtId = 'PROMEDIA-' + c.id + '-' + sc.day + '-' + Math.random().toString(36).substr(2, 5) + '@promedia';
      const dtstamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

      icsContent += "BEGIN:VEVENT\n";
      icsContent += `UID:${evtId}\n`;
      icsContent += `DTSTAMP:${dtstamp}\n`;
      // DTSTART and DTEND in local time without Z to float in local timezone
      icsContent += `DTSTART;TZID=America/Lima:${dateStr}T${tStart}\n`;
      icsContent += `DTEND;TZID=America/Lima:${dateStr}T${tEnd}\n`;
      icsContent += `RRULE:FREQ=WEEKLY;UNTIL=${endStr};BYDAY=${icalDay}\n`;
      icsContent += `SUMMARY:${c.name}\n`;
      if (sc.room) icsContent += `LOCATION:${sc.room}\n`;
      icsContent += "END:VEVENT\n";
      
      eventsAdded++;
    });
  });

  icsContent += "END:VCALENDAR";

  if (eventsAdded === 0) {
    showToast('Ningún curso tiene horario configurado.', 'error');
    return;
  }

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Horario_${state.currentCycle || 'Promedia'}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('Horario exportado (.ics)', 'check');
}

