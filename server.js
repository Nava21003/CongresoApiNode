const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let participantes = [
    {
        id: 1,
        nombre: "Juliana",
        apellidos: "Rubio",
        email: "juliana.r@ejemplo.com",
        usuarioTwitter: "@JRubio",
        ocupacion: "Desarrolladora de Software",
        idAvatar: 1
    },
    {
        id: 2,
        nombre: "Raúl",
        apellidos: "Medina",
        email: "raul.m@ejemplo.com",
        usuarioTwitter: "@RoulMedina",
        ocupacion: "Ingeniero Front-End",
        idAvatar: 2
    },
    {
        id: 3,
        nombre: "Carlos",
        apellidos: "Andrade",
        email: "carlos.a@ejemplo.com",
        usuarioTwitter: "@CAndrode",
        ocupacion: "Desarrollador Web Full Stack",
        idAvatar: 3
    },
];

let nextId = 4;

app.get('/api/listado', (req, res) => {
    const query = req.query.q;

    if (query) {
        const lowerQuery = query.toLowerCase();
        const resultados = participantes.filter(p =>
            p.nombre.toLowerCase().includes(lowerQuery) ||
            p.apellidos.toLowerCase().includes(lowerQuery) ||
            p.ocupacion.toLowerCase().includes(lowerQuery)
        );
        return res.json(resultados);
    } else {
        return res.json(participantes);
    }
});

app.get('/api/participante/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const participante = participantes.find(p => p.id === id);

    if (participante) {
        return res.json(participante);
    } else {
        return res.status(404).json({ message: "Participante no encontrado" });
    }
});

app.post('/api/registro', (req, res) => {
    const { nombre, apellidos, email, usuarioTwitter, ocupacion, idAvatar } = req.body;

    if (!nombre || !email || !usuarioTwitter) {
        return res.status(400).json({ message: "Faltan campos requeridos (nombre, email, twitter)." });
    }

    const nuevoParticipante = {
        id: nextId++,
        nombre,
        apellidos: apellidos || '',
        email,
        usuarioTwitter,
        ocupacion,
        idAvatar: parseInt(idAvatar) || 1
    };

    participantes.push(nuevoParticipante);

    return res.status(201).json(nuevoParticipante);
});

app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});