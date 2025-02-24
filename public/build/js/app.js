let paso=1;const pasoInicial=1,pasoFinal=3,cita={nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),consultarAPI(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");const t=`#paso-${paso}`;document.querySelector(t).classList.add("mostrar");const o=document.querySelector(".actual");o&&o.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach((e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))}))}function botonesPaginador(){const e=document.querySelector("#siguiente"),t=document.querySelector("#anterior");1===paso?(e.classList.remove("ocultar"),t.classList.add("ocultar")):3===paso?(t.classList.remove("ocultar"),e.classList.add("ocultar"),mostrarResumen()):(t.classList.remove("ocultar"),e.classList.remove("ocultar")),mostrarSeccion()}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",(function(){paso>=3||(paso++,botonesPaginador())}))}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",(function(){paso<=1||(paso--,botonesPaginador())}))}async function consultarAPI(){try{const e="http://localhost:3000/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach((e=>{const{id:t,nombre:o,precio:n}=e,a=document.createElement("P");a.classList.add("nombre-servicio"),a.textContent=o;const c=document.createElement("P");c.classList.add("precio-servicio"),c.textContent=`$${n}`;const r=document.createElement("DIV");r.classList.add("servicio"),r.dataset.idServicio=t,r.onclick=function(){seleccionarServicio(e)},r.appendChild(a),r.appendChild(c),document.querySelector("#servicios").appendChild(r)}))}function seleccionarServicio(e){const{id:t}=e,{servicios:o}=cita,n=document.querySelector(`[data-id-servicio="${t}"]`);o.some((e=>e.id===t))?(cita.servicios=o.filter((e=>e.id!==t)),n.classList.remove("seleccionado")):(cita.servicios=[...o,e],n.classList.add("seleccionado"))}function nombreCliente(){const e=document.querySelector("#nombre").value;cita.nombre=e}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();if([6,0].includes(t))e.target.value="",mostrarAlerta("error","Fines de semana no permitidos",".formulario");else{const t=e.target.value;cita.fecha=t}}))}function seleccionarHora(){document.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value.split(":")[0];t<10||t>18?(e.target.value="",mostrarAlerta("error","Hora no permitida",".formulario")):cita.hora=e.target.value}))}function mostrarAlerta(e,t,o,n=!0){const a=document.querySelector(".alerta");a&&a.remove();const c=document.createElement("DIV");c.textContent=t,c.classList.add("alerta"),c.classList.add(e);document.querySelector(o).appendChild(c),n&&setTimeout((()=>{c.remove()}),3e3)}function mostrarResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||0===cita.servicios.length)return void mostrarAlerta("error","Faltan datos de servicios, fecha u hora",".contenido-resumen",!1);const{nombre:t,fecha:o,hora:n,servicios:a}=cita,c=document.createElement("H3");c.textContent="Resumen de servicios",e.appendChild(c),a.forEach((t=>{const{id:o,precio:n,nombre:a}=t,c=document.createElement("DIV");c.classList.add("contenedor-servicio");const r=document.createElement("P");r.textContent=a;const s=document.createElement("P");s.innerHTML=`<span>Precio:</span> $${n}`,c.appendChild(r),c.appendChild(s),e.appendChild(c)}));const r=document.createElement("H3");r.textContent="Resumen de cita",e.appendChild(r);const s=document.createElement("P");s.innerHTML=`<span>Nombre:</span> ${t}`;const i=new Date(o),d=i.getMonth(),l=i.getDate()+2,u=i.getFullYear(),m=new Date(Date.UTC(u,d,l)).toLocaleDateString("es-CO",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),p=document.createElement("P");p.innerHTML=`<span>Fecha:</span> ${m}`;const v=document.createElement("P");v.innerHTML=`<span>Hora:</span> ${n}`;const h=document.createElement("BUTTON");h.classList.add("boton"),h.textContent="Reservar",h.onclick=reservarCita(),e.appendChild(s),e.appendChild(p),e.appendChild(v),e.appendChild(h)}async function reservarCita(){const e=new FormData;e.append("nombre","Juan");const t=await fetch("http://localhost:3000/api/citas",{method:"POST",body:e}),o=await t.json();console.log(o)}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));