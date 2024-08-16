
let isDarkMode = true;
let text = "Clear";
let currentIndex = 0;

const toggleText = document.getElementById('toggleText');
const cursor = document.getElementById('cursor');
const period = document.getElementById('period');
const dateTimeText = document.getElementById('dateTimeText');
const dateTimeContainer = document.getElementById('dateTimeContainer');
const textContainer = document.getElementById('textContainer');

toggleText.innerHTML = "";
period.style.display = "none";

function typeText() {
    if (currentIndex < text.length) {
        toggleText.innerHTML += text.charAt(currentIndex);
        currentIndex++;
        setTimeout(typeText, 200);
    } else {
        cursor.style.display = 'none'; // Ocultar el cursor después de que el tipeo termine
        // Mostrar el punto solo si no estamos en el modo de fecha y hora
        if (dateTimeContainer.classList.contains('hidden')) {
            period.style.display = 'inline-block';
        }
    }
}

typeText();

function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedTime = now.toLocaleTimeString('en-GB');
    dateTimeText.innerHTML = `${formattedDate} ${formattedTime}`;
}

setInterval(updateDateTime, 1000); // Actualiza la hora cada segundo

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'f' || event.key === 'F') {
        // Mover la palabra a la esquina superior izquierda
        textContainer.style.transform = 'translate(-50px, -100px) scale(0.5)';
        setTimeout(() => {
            dateTimeContainer.style.opacity = 1;
            dateTimeContainer.classList.remove('hidden');
            toggleText.style.opacity = 0; // Ocultar la palabra
            period.style.display = 'none'; // Asegurarse de ocultar el punto
        }, 500);
    }

    if (event.key === 'g' || event.key === 'G') {
        // Volver a centrar la palabra
        textContainer.style.transform = 'translate(0, 0) scale(1)';
        setTimeout(() => {
            dateTimeContainer.style.opacity = 0;
            setTimeout(() => {
                dateTimeContainer.classList.add('hidden');
                toggleText.style.opacity = 1; // Mostrar la palabra de nuevo
                period.style.display = 'inline-block'; // Mostrar el punto de nuevo
            }, 500);
        }, 500);
    }
});

document.body.addEventListener('click', (event) => {
    if (event.target.id === 'dateTimeText' || event.target.id === 'dateTimeContainer') {
        // Cambiar entre modos claro y oscuro
        isDarkMode = !isDarkMode;

        if (isDarkMode) {
            text = "Clear";
            document.body.style.backgroundColor = '#000';
            toggleText.style.color = '#fff';
            dateTimeText.style.color = '#fff';
        } else {
            text = "Dark";
            document.body.style.backgroundColor = '#fff';
            toggleText.style.color = '#000'; // Cambiar a negro al tipear "Dark"
            dateTimeText.style.color = '#000';
        }

        // Reiniciar el tipeo de la palabra después del cambio de modo sin mostrar el punto
        toggleText.innerHTML = "";
        currentIndex = 0;
        typeText();
    }
});

document.addEventListener('mousemove', function(e) {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;

    const movementX = x * 20;
    const movementY = y * 20;

    // Mueve todo el contenedor de texto, el punto y el cursor juntos
    const transformValue = `translate(${movementX}px, ${movementY}px)`;

    textContainer.style.transform = transformValue;
});
