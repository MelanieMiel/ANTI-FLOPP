// lib/mcp/databaseService.js
// MCP 4: Base de Datos Persistente (Proyectos, Historial de Diagnósticos y Roadmaps)
// Funciona 100% Plug & Play con almacenamiento JSON local persistente en tu workspace

import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'antiflop_projects_db.json');

function initDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ proyectos: {}, metadata: { version: '1.0.0', updatedAt: new Date().toISOString() } }, null, 2));
  }
}

export async function guardarProyectoDB(nombreProyecto, datos) {
  try {
    initDb();
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const db = JSON.parse(raw);

    const slug = nombreProyecto.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
    db.proyectos[slug] = {
      nombre: nombreProyecto,
      ...datos,
      actualizadoEl: new Date().toISOString()
    };
    db.metadata.updatedAt = new Date().toISOString();

    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    return { ok: true, slug, mensaje: `Proyecto "${nombreProyecto}" respaldado con éxito en Base de Datos.` };
  } catch (err) {
    console.error('Error guardando en DB:', err.message);
    return { ok: false, error: err.message };
  }
}

export async function consultarProyectoDB(nombreProyecto) {
  try {
    initDb();
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const db = JSON.parse(raw);
    const slug = nombreProyecto.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
    return db.proyectos[slug] || null;
  } catch (err) {
    return null;
  }
}

export async function listarTodosLosProyectosDB() {
  try {
    initDb();
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const db = JSON.parse(raw);
    return Object.values(db.proyectos);
  } catch (err) {
    return [];
  }
}
