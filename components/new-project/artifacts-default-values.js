export const lowLevelTestCasesDefaultValues = [
  {
    key: "Título",
    type: "text",
    required: true,
    options: [],
  },
  {
    key: "Estado",
    type: "selection",
    required: true,
    options: ["Pendiente", "Aprobado", "Fallido"],
  },
  {
    key: "Prioridad",
    type: "selection",
    required: false,
    options: ["Alta", "Media", "Baja"],
  },
  {
    key: "Responsable",
    type: "member",
    required: false,
    options: [],
  },
  {
    key: "Descripción",
    type: "text",
    required: false,
    options: [],
  },
  {
    key: "Precondiciones",
    type: "text",
    required: false,
    options: [],
  },
  {
    key: "Entradas",
    type: "text",
    required: false,
    options: [],
  },
  {
    key: "Pasos",
    type: "text",
    required: false,
    options: [],
  },
  {
    key: "Resultados esperados",
    type: "text",
    required: false,
    options: [],
  },
  {
    key: "Tiempo estimado",
    type: "datetime",
    required: false,
    options: [],
  },
];

export const highLevelTestCasesDefaultValues = [
  {
    key: "Título",
    type: "text",
    required: true,
    options: [],
  },
  {
    key: "Estado",
    type: "selection",
    required: true,
    options: ["Pendiente", "Aprobado", "Fallido"],
  },
  {
    key: "Prioridad",
    type: "selection",
    required: false,
    options: ["Alta", "Media", "Baja"],
  },
  {
    key: "Responsable",
    type: "member",
    required: false,
    options: [],
  },
  {
    key: "Resultados esperados",
    type: "text",
    required: false,
    options: [],
  },
];

export const bugsDefaultValues = [
  {
    key: "Título",
    type: "text",
    required: true,
    options: [],
  },
  {
    key: "Estado",
    type: "selection",
    required: true,
    options: ["Pendiente", "En progreso", "Resuelto"],
  },
  {
    key: "Prioridad",
    type: "selection",
    required: false,
    options: ["Alta", "Media", "Baja"],
  },
  {
    key: "Severidad",
    type: "selection",
    required: false,
    options: ["Alta", "Media", "Baja"],
  },
  {
    key: "Descripción",
    type: "text",
    required: false,
    options: [],
  },
  {
    key: "Precondiciones",
    type: "text",
    required: false,
    options: [],
  },
  {
    key: "Pasos para reproducir",
    type: "text",
    required: false,
    options: [],
  },
  {
    key: "Resultado actual",
    type: "text",
    required: false,
    options: [],
  },
  {
    key: "Resultado esperado",
    type: "text",
    required: false,
    options: [],
  },
];
