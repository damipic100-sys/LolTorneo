import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://klnnytucxqfojusrkaya.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtsbm55dHVjeHFmb2p1c3JrYXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MDEwMjksImV4cCI6MjA4MjM3NzAyOX0.HFCHI16jLS6omtZrAfC-BGhzb0UEA8NVTioTF7-rzQk"
);
const app = document.getElementById("app");
app.textContent = "Cargando ladder...";

async function cargarLadder() {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("elo", { ascending: false });

  if (error) {
    console.error(error);
    app.textContent = "Error cargando ladder";
    return;
  }

  if (!data || data.length === 0) {
    app.textContent = "No hay jugadores en la ladder";
    return;
  }

  app.innerHTML = `
    <table>
      <tr><th>#</th><th>Jugador</th><th>Rank</th><th>LP</th></tr>
      ${data.map((p,i)=>`
        <tr>
          <td>${i+1}</td>
          <td>${p.riot_id}</td>
          <td>${p.rank}</td>
          <td>${p.lp}</td>
        </tr>
      `).join("")}
    </table>
  `;
}

cargarLadder();
