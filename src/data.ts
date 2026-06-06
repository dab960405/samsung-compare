export type ComparisonRow = {
  id: string;
  section: string;
  criterio: string;
  s21fe: string;
  tabs7: string;
  winner?: 's21fe' | 'tabs7' | 'none';
};

export const COMPARISON_DATA: ComparisonRow[] = [
  // 1. IDENTIFICACIÓN DEL DISPOSITIVO
  { id: '1-1', section: '1. IDENTIFICACIÓN DEL DISPOSITIVO', criterio: 'Tipo de dispositivo', s21fe: 'Smartphone', tabs7: 'Tablet PC', winner: 'none' },
  { id: '1-2', section: '1. IDENTIFICACIÓN DEL DISPOSITIVO', criterio: 'Modelo/Serie', s21fe: 'Galaxy S21 FE 5G – Fan Edition', tabs7: 'Galaxy Tab S7 (SM-T870)', winner: 'none' },
  { id: '1-3', section: '1. IDENTIFICACIÓN DEL DISPOSITIVO', criterio: 'Año de lanzamiento', s21fe: 'Enero 2022', tabs7: 'Agosto 2020', winner: 's21fe' },
  { id: '1-4', section: '1. IDENTIFICACIÓN DEL DISPOSITIVO', criterio: 'Fabricante', s21fe: 'Samsung Electronics (Corea del Sur)', tabs7: 'Samsung Electronics (Corea del Sur)', winner: 'none' },
  { id: '1-5', section: '1. IDENTIFICACIÓN DEL DISPOSITIVO', criterio: 'Ver info en el dispositivo', s21fe: 'Ajustes > Acerca del teléfono > Información del software', tabs7: 'Ajustes > Acerca del tablet > Información del software', winner: 'none' },
  
  // 2. PANTALLA
  { id: '2-1', section: '2. PANTALLA', criterio: 'Tamaño de pantalla', s21fe: '6,4 pulgadas', tabs7: '11 pulgadas', winner: 'tabs7' },
  { id: '2-2', section: '2. PANTALLA', criterio: 'Tecnología', s21fe: 'Dynamic AMOLED 2X', tabs7: 'LCD TFT (LTPS)', winner: 's21fe' },
  { id: '2-3', section: '2. PANTALLA', criterio: 'Resolución', s21fe: 'FHD+ 2340 × 1080 px', tabs7: 'WQXGA 2560 × 1600 px', winner: 'tabs7' },
  { id: '2-4', section: '2. PANTALLA', criterio: 'Tasa de refresco', s21fe: '120 Hz adaptable', tabs7: '120 Hz adaptable', winner: 'none' },
  { id: '2-5', section: '2. PANTALLA', criterio: 'Relación pantalla/cuerpo', s21fe: '~86,8%', tabs7: '~83,6%', winner: 's21fe' },
  { id: '2-6', section: '2. PANTALLA', criterio: 'Touch/Stylus', s21fe: 'Táctil capacitivo multitáctil', tabs7: 'Táctil capacitivo + S Pen incluida', winner: 'tabs7' },

  // 3. PROCESADOR
  { id: '3-1', section: '3. PROCESADOR', criterio: 'Chipset', s21fe: 'Qualcomm Snapdragon 888 / Exynos 2100', tabs7: 'Qualcomm Snapdragon 865+', winner: 's21fe' },
  { id: '3-2', section: '3. PROCESADOR', criterio: 'Arquitectura CPU', s21fe: 'Octa-core: 1×2,84 GHz Cortex-X1 + 3×2,42 GHz + 4×1,80 GHz', tabs7: 'Octa-core: 1×3,09 GHz Kryo 585 + 3×2,42 GHz + 4×1,80 GHz', winner: 'tabs7' },
  { id: '3-3', section: '3. PROCESADOR', criterio: 'Proceso de fabricación', s21fe: '5 nm', tabs7: '7 nm', winner: 's21fe' },
  { id: '3-4', section: '3. PROCESADOR', criterio: 'GPU', s21fe: 'Adreno 660', tabs7: 'Adreno 650', winner: 's21fe' },

  // 4. MEMORIA
  { id: '4-1', section: '4. MEMORIA', criterio: 'RAM', s21fe: '6 GB / 8 GB LPDDR5', tabs7: '6 GB / 8 GB LPDDR5', winner: 'none' },
  { id: '4-2', section: '4. MEMORIA', criterio: 'Almacenamiento interno', s21fe: '128 GB / 256 GB (UFS 3.1)', tabs7: '128 GB / 256 GB (UFS 3.0)', winner: 's21fe' },
  { id: '4-3', section: '4. MEMORIA', criterio: 'Ranura MicroSD', s21fe: 'No', tabs7: 'Sí – hasta 1 TB', winner: 'tabs7' },

  // 5. SISTEMA OPERATIVO
  { id: '5-1', section: '5. SISTEMA OPERATIVO', criterio: 'SO de fábrica', s21fe: 'Android 12 – One UI 4.0', tabs7: 'Android 10 – One UI 2.5', winner: 's21fe' },
  { id: '5-2', section: '5. SISTEMA OPERATIVO', criterio: 'Última versión actualizable', s21fe: 'Android 14 – One UI 6.0', tabs7: 'Android 13 – One UI 5.1', winner: 's21fe' },
  { id: '5-3', section: '5. SISTEMA OPERATIVO', criterio: 'Actualizaciones de seguridad', s21fe: '4 años (hasta 2026)', tabs7: '4 años (hasta 2024)', winner: 's21fe' },
  { id: '5-4', section: '5. SISTEMA OPERATIVO', criterio: 'Tienda de aplicaciones', s21fe: 'Google Play Store + Galaxy Store', tabs7: 'Google Play Store + Galaxy Store', winner: 'none' },

  // 6. CONECTIVIDAD
  { id: '6-1', section: '6. CONECTIVIDAD', criterio: 'Redes celulares', s21fe: '2G / 3G / 4G LTE / 5G Sub-6 GHz', tabs7: 'Wi-Fi only / LTE / 5G (según variante)', winner: 's21fe' },
  { id: '6-2', section: '6. CONECTIVIDAD', criterio: 'Wi-Fi', s21fe: 'Wi-Fi 6 (802.11 a/b/g/n/ac/ax) – Dual Band', tabs7: 'Wi-Fi 6 (802.11 a/b/g/n/ac/ax) – Dual Band + Wi-Fi Direct', winner: 'none' },
  { id: '6-3', section: '6. CONECTIVIDAD', criterio: 'Bluetooth', s21fe: '5.2 – A2DP, LE, aptX', tabs7: '5.0 – A2DP, LE, aptX', winner: 's21fe' },
  { id: '6-4', section: '6. CONECTIVIDAD', criterio: 'NFC', s21fe: 'Sí', tabs7: 'Sí', winner: 'none' },
  { id: '6-5', section: '6. CONECTIVIDAD', criterio: 'GPS', s21fe: 'GPS, A-GPS, GLONASS, BDS, GALILEO', tabs7: 'GPS, A-GPS, GLONASS, BDS, GALILEO', winner: 'none' },
  { id: '6-6', section: '6. CONECTIVIDAD', criterio: 'USB', s21fe: 'USB-C 3.2 Gen 1 (OTG, carga rápida)', tabs7: 'USB-C 3.1 Gen 1 (OTG, carga rápida, salida DisplayPort)', winner: 'tabs7' },
  { id: '6-7', section: '6. CONECTIVIDAD', criterio: 'Jack 3,5 mm', s21fe: 'No', tabs7: 'No', winner: 'none' },

  // 7. HARDWARE Y SENSORES
  { id: '7-1', section: '7. HARDWARE Y SENSORES', criterio: 'Resistencia al agua/polvo', s21fe: 'IP68 (agua hasta 1,5 m / 30 min)', tabs7: 'No certificado IP', winner: 's21fe' },
  { id: '7-2', section: '7. HARDWARE Y SENSORES', criterio: 'Lector de huellas', s21fe: 'Óptico bajo pantalla', tabs7: 'Lateral (en botón de encendido)', winner: 'none' },
  { id: '7-3', section: '7. HARDWARE Y SENSORES', criterio: 'Reconocimiento facial', s21fe: '2D (cámara frontal)', tabs7: '2D (cámara frontal)', winner: 'none' },
  { id: '7-4', section: '7. HARDWARE Y SENSORES', criterio: 'Acelerómetro', s21fe: 'Sí', tabs7: 'Sí', winner: 'none' },
  { id: '7-5', section: '7. HARDWARE Y SENSORES', criterio: 'Giroscopio', s21fe: 'Sí', tabs7: 'Sí', winner: 'none' },
  { id: '7-6', section: '7. HARDWARE Y SENSORES', criterio: 'Brújula/Magnetómetro', s21fe: 'Sí', tabs7: 'Sí', winner: 'none' },
  { id: '7-7', section: '7. HARDWARE Y SENSORES', criterio: 'Barómetro', s21fe: 'No', tabs7: 'No', winner: 'none' },
  { id: '7-8', section: '7. HARDWARE Y SENSORES', criterio: 'Sensor de luz ambiental', s21fe: 'Sí', tabs7: 'Sí', winner: 'none' },
  { id: '7-9', section: '7. HARDWARE Y SENSORES', criterio: 'Altavoces/Audio', s21fe: 'Estéreo – AKG Tuned', tabs7: 'Cuádruple estéreo – AKG Tuned + Dolby Atmos', winner: 'tabs7' },

  // 8. CÁMARAS
  { id: '8-1', section: '8. CÁMARAS', criterio: 'Cámara principal trasera', s21fe: '12 MP f/1.8 – OIS + PDAF', tabs7: '13 MP f/2.0', winner: 's21fe' },
  { id: '8-2', section: '8. CÁMARAS', criterio: 'Cámara ultra gran angular', s21fe: '12 MP f/2.2 – 123°', tabs7: '5 MP f/2.2 – 123°', winner: 's21fe' },
  { id: '8-3', section: '8. CÁMARAS', criterio: 'Teleobjetivo', s21fe: '8 MP f/2.4 – Zoom óptico 3× + OIS', tabs7: 'No tiene', winner: 's21fe' },
  { id: '8-4', section: '8. CÁMARAS', criterio: 'Grabación de video', s21fe: '4K@60fps, 1080p@240fps, Super Steady', tabs7: '4K@30fps, 1080p@60fps', winner: 's21fe' },
  { id: '8-5', section: '8. CÁMARAS', criterio: 'Cámara frontal', s21fe: '32 MP f/2.2', tabs7: '8 MP f/2.0', winner: 's21fe' },
  { id: '8-6', section: '8. CÁMARAS', criterio: 'Video selfie', s21fe: '4K@30fps', tabs7: '1080p@30fps', winner: 's21fe' },

  // 9. BATERÍA
  { id: '9-1', section: '9. BATERÍA', criterio: 'Capacidad', s21fe: '4.500 mAh (Li-Ion, no extraíble)', tabs7: '8.000 mAh (Li-Po, no extraíble)', winner: 'tabs7' },
  { id: '9-2', section: '9. BATERÍA', criterio: 'Carga rápida por cable', s21fe: '25 W – ~61 min carga completa', tabs7: '45 W – ~80 min carga completa', winner: 'tabs7' },
  { id: '9-3', section: '9. BATERÍA', criterio: 'Carga inalámbrica', s21fe: '15 W (Qi compatible)', tabs7: 'No soporta', winner: 's21fe' },
  { id: '9-4', section: '9. BATERÍA', criterio: 'Carga inversa inalámbrica', s21fe: 'Sí – PowerShare (4,5 W)', tabs7: 'No', winner: 's21fe' },

  // 10. DISEÑO Y DIMENSIONES
  { id: '10-1', section: '10. DISEÑO Y DIMENSIONES', criterio: 'Dimensiones', s21fe: '155,7 × 74,5 × 7,9 mm', tabs7: '253,8 × 165,3 × 6,3 mm', winner: 'none' },
  { id: '10-2', section: '10. DISEÑO Y DIMENSIONES', criterio: 'Peso', s21fe: '177 g', tabs7: '498 g', winner: 's21fe' },
  { id: '10-3', section: '10. DISEÑO Y DIMENSIONES', criterio: 'Material trasero/marco', s21fe: 'Policarbonato / Aluminio', tabs7: 'Plástico reforzado / Aluminio', winner: 'none' },
  { id: '10-4', section: '10. DISEÑO Y DIMENSIONES', criterio: 'Colores disponibles', s21fe: 'Graphite, Lavender, White, Olive', tabs7: 'Mystic Black, Mystic Silver, Mystic Bronze', winner: 'none' },

  // 11. FUNCIONALIDADES ESPECIALES
  { id: '11-1', section: '11. FUNCIONALIDADES ESPECIALES', criterio: 'S Pen / Stylus', s21fe: 'No compatible', tabs7: 'S Pen incluida (escritura, dibujo, traducción)', winner: 'tabs7' },
  { id: '11-2', section: '11. FUNCIONALIDADES ESPECIALES', criterio: 'Samsung DeX', s21fe: 'Sí – via cable o inalámbrico', tabs7: 'Sí – via cable o inalámbrico', winner: 'none' },
  { id: '11-3', section: '11. FUNCIONALIDADES ESPECIALES', criterio: 'Modo multitarea', s21fe: 'Sí', tabs7: 'Sí (optimizado para pantalla grande)', winner: 'tabs7' },
  { id: '11-4', section: '11. FUNCIONALIDADES ESPECIALES', criterio: 'Pagos móviles', s21fe: 'Samsung Pay / Google Pay / NFC', tabs7: 'Samsung Pay / Google Pay / NFC', winner: 'none' },
  { id: '11-5', section: '11. FUNCIONALIDADES ESPECIALES', criterio: 'Asistente de voz', s21fe: 'Bixby + Google Assistant', tabs7: 'Bixby + Google Assistant', winner: 'none' },
  { id: '11-6', section: '11. FUNCIONALIDADES ESPECIALES', criterio: 'Escaneo QR', s21fe: 'Sí (cámara + barra de búsqueda)', tabs7: 'Sí (cámara)', winner: 'none' },
  { id: '11-7', section: '11. FUNCIONALIDADES ESPECIALES', criterio: 'Llamadas telefónicas', s21fe: 'Sí', tabs7: 'Solo en variante LTE/5G o via apps', winner: 's21fe' },
  { id: '11-8', section: '11. FUNCIONALIDADES ESPECIALES', criterio: 'SMS / Mensajería', s21fe: 'Sí – SMS, MMS, RCS', tabs7: 'Solo via apps', winner: 's21fe' },

  // 12. PRECIO DE REFERENCIA
  { id: '12-1', section: '12. PRECIO DE REFERENCIA', criterio: 'Precio inicial (128 GB)', s21fe: 'USD $699 / COP ~$2.800.000', tabs7: 'USD $649 / COP ~$2.600.000', winner: 'none' },
  { id: '12-2', section: '12. PRECIO DE REFERENCIA', criterio: 'Relación calidad-precio', s21fe: 'Alta (gama premium accesible)', tabs7: 'Alta (tablet flagship de productividad)', winner: 'none' }
];

export const CATEGORIES = [
  "1. IDENTIFICACIÓN DEL DISPOSITIVO",
  "2. PANTALLA",
  "3. PROCESADOR",
  "4. MEMORIA",
  "5. SISTEMA OPERATIVO",
  "6. CONECTIVIDAD",
  "7. HARDWARE Y SENSORES",
  "8. CÁMARAS",
  "9. BATERÍA",
  "10. DISEÑO Y DIMENSIONES",
  "11. FUNCIONALIDADES ESPECIALES",
  "12. PRECIO DE REFERENCIA"
];
