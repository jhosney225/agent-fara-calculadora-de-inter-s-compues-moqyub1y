```javascript
#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para calcular interés compuesto
function calcularInteresCompuesto(capital, tasaAnual, periodos, frecuencia) {
  // capital: monto inicial
  // tasaAnual: tasa de interés anual en porcentaje
  // periodos: número de años
  // frecuencia: número de veces que se capitaliza por año (1=anual, 2=semestral, 4=trimestral, 12=mensual, 365=diario)
  
  const tasa = tasaAnual / 100;
  const n = frecuencia;
  const t = periodos;
  
  const montoFinal = capital * Math.pow(1 + (tasa / n), n * t);
  const interesCobrado = montoFinal - capital;
  
  return {
    montoFinal: parseFloat(montoFinal.toFixed(2)),
    interesCobrado: parseFloat(interesCobrado.toFixed(2)),
    capitalInicial: capital
  };
}

// Función para generar tabla de proyección
function generarTablaProyeccion(capital, tasaAnual, periodos, frecuencia) {
  const tasa = tasaAnual / 100;
  const n = frecuencia;
  const tabla = [];
  
  for (let ano = 0; ano <= periodos; ano++) {
    const montoAno = capital * Math.pow(1 + (tasa / n), n * ano);
    tabla.push({
      ano: ano,
      monto: parseFloat(montoAno.toFixed(2)),
      interes: parseFloat((montoAno - capital).toFixed(2))
    });
  }
  
  return tabla;
}

// Función para mostrar resultados formateados
function mostrarResultados(resultado) {
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESULTADOS DEL CÁLCULO');
  console.log('='.repeat(50));
  console.log(`💰 Capital Inicial:        $${resultado.capitalInicial.toLocaleString('es-CO')}`);
  console.log(`📈 Monto Final:            $${resultado.montoFinal.toLocaleString('es-CO')}`);
  console.log(`💵 Interés Ganado:         $${resultado.interesCobrado.toLocaleString('es-CO')}`);
  console.log('='.repeat(50) + '\n');
}

// Función para mostrar tabla de proyección
function mostrarTabla(tabla) {
  console.log('\n' + '='.repeat(60));
  console.log('📋 PROYECCIÓN AÑO A AÑO');
  console.log('='.repeat(60));
  console.log('Año\t\tMonto\t\t\tInterés Acumulado');
  console.log('-'.repeat(60));
  
  tabla.forEach(row => {
    console.log(`${row.ano}\t\t$${row.monto.toLocaleString('es-CO')}\t\t$${row.interes.toLocaleString('es-CO')}`);
  });
  
  console.log('='.repeat(60) + '\n');
}

// Función para obtener entrada del usuario
function preguntarUsuario(pregunta) {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta);
    });
  });
}

// Función para validar entrada numérica
function validarNumero(valor, minimo = 0) {
  const num = parseFloat(valor);
  if (isNaN(num) || num < minimo) {
    return null;
  }
  return num;
}

// Función principal
async function main() {
  console.log('\n╔════════════════════════════════════════════════════╗');
  console.log('║     🏦 CALCULADORA DE INTERÉS COMPUESTO 🏦        ║');
  console.log('║         Para Análisis de Inversiones              ║');
  console.log('╚════════════════════════════════════════════════════╝\n');
  
  let continuar = true;
  
  while (continuar) {
    // Solicitar datos
    let capital = null;
    while (capital === null) {
      const input = await preguntarUsuario('💵 Ingresa el capital inicial ($): ');
      capital = validarNumero(input, 1);
      if (capital === null) {
        console.log('❌ Por favor ingresa un número válido mayor a 0\n');
      }
    }
    
    let tasaAnual = null;
    while (tasaAnual === null) {
      const input = await preguntarUsuario('📊 Ingresa la tasa de interés anual (%): ');
      tasaAnual = validarNumero(input, 0);
      if (tasaAnual === null) {
        console.log('❌ Por favor ingresa un número válido\n');
      }
    }
    
    let periodos = null;
    while (periodos === null) {
      const input = await preguntarUsuario('⏰ Ingresa el número de años: ');
      periodos = validarNumero(input, 1);
      if (periodos === null || !Number.isInteger(periodos)) {
        console.log('❌ Por favor ingresa un número entero válido\n');
        periodos = null;
      }
    }
    
    console.log('\n🔄 Selecciona la frecuencia de capitalización:');
    console.log('   1) Anual