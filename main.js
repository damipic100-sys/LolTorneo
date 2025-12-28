const app = document.getElementById("app");
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://klnnytucxqfojusrkaya.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtsbm55dHVjeHFmb2p1c3JrYXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MDEwMjksImV4cCI6MjA4MjM3NzAyOX0.HFCHI16jLS6omtZrAfC-BGhzb0UEA8NVTioTF7-rzQk"
);
async function cargarLadder() {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("elo", { ascending: false });

  if (error) {
    app.innerHTML = "Error cargando ladder";
    return;
  }
app.innerHTML = `
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Jugador</th>
        <th>Rank</th>
        <th>LP</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Ejemplo#LAS</td>
        <td>Diamond I</td>
        <td>75</td>
      </tr>
    </tbody>
  </table>
`;
cargarLadder();
