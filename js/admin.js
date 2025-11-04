const STORAGE_KEY = 'doctorData';

// Datos iniciales
const inicialDoctor = [
  { 
    id: '1700000000001', 
    name: 'Dra. Micaela Caravajal', 
    especialidad: 'Neurología', 
    imageUrl: "https://elmundodemozart.com/wp-content/uploads/2024/12/pediatra-en-guarderia.webp" 
  },
  { 
    id: '1700000000002', 
    name: 'Dra. Maria L. Flamarique', 
    especialidad: 'Ginecología', 
    imageUrl: "https://elmundodemozart.com/wp-content/uploads/2024/12/pediatra-en-guarderia.webp" 
  }
];

// Inicializa localStorage si está vacío
function inicializarLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inicialDoctor));
    console.log("LocalStorage inicializado con médicos por defecto.");
  }
}

// Obtener y guardar
function getDoctor() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function guardarDoctor(doctorArray) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(doctorArray));
}

// Agregar nuevo médico
function addDoctor(doctorData) {
  const doctor = getDoctor();
  const newId = Date.now().toString();
  const newDoctor = { id: newId, ...doctorData };
  doctor.push(newDoctor);
  guardarDoctor(doctor);
  console.log("Nuevo médico agregado:", newDoctor);
}

// Eliminar médico
function removeDoctor(id) {
  if (confirm("¿Estás seguro de que quieres eliminar a este médico?")) {
    let doctor = getDoctor();
    doctor = doctor.filter(d => d.id !== id);
    guardarDoctor(doctor);
    displayDoctor();
  }
}

// Mostrar todos los médicos
function displayDoctor() {
  const doctor = getDoctor();
  const container = document.getElementById('doctors-list-container');
  container.innerHTML = '';

  if (doctor.length === 0) {
    container.innerHTML = '<p class="text-muted">No hay médicos cargados.</p>';
    return;
  }

  doctor.forEach(doctor => {
    const card = document.createElement('div');
    card.className = 'card text-center shadow-sm p-3';
    card.style.width = '16rem';

    card.innerHTML = `
      <img src="${doctor.imageUrl}" alt="Foto de ${doctor.name}" class="rounded-circle mx-auto d-block" style="width:120px; height:120px; object-fit:cover;">
      <div class="card-body">
        <h5>${doctor.name}</h5>
        <p>${doctor.especialidad}</p>
        <button class="btn btn-danger btn-sm" onclick="removeDoctor('${doctor.id}')">🗑️ Eliminar</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Escucha el envío del formulario
document.addEventListener('DOMContentLoaded', () => {
  inicializarLocalStorage();
  displayDoctor();

  const form = document.getElementById('doctor-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newDoctorData = {
      name: document.getElementById('name-input').value.trim(),
      especialidad: document.getElementById('especialidad-input').value.trim(),
      imageUrl: document.getElementById('image-url-input').value.trim() || "https://elmundodemozart.com/wp-content/uploads/2024/12/pediatra-en-guarderia.webp"
    };

    if (newDoctorData.name && newDoctorData.especialidad) {
      addDoctor(newDoctorData);
      form.reset();
      displayDoctor(); // 🔥 Esta línea refresca la vista al instante
    } else {
      alert("Por favor, completá al menos el nombre y la especialidad.");
    }
  });
});
