export async function onRequest(context) {
  const { params, env } = context;
  const summonerName = params.name;
  const region = params.region;
  const RIOT_API_KEY = env.RIOT_API_KEY;

  try {
    // 1. Obtener summoner
    const summonerRes = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
      headers: { "X-Riot-Token": RIOT_API_KEY }
    });
    if (!summonerRes.ok) return new Response("Jugador no encontrado", { status: 404 });
    const summoner = await summonerRes.json();

    // 2. Obtener rank
    const rankRes = await fetch(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}`, {
      headers: { "X-Riot-Token": RIOT_API_KEY }
    });
    const ranks = await rankRes.json();
    const soloQ = ranks.find(r => r.queueType === "RANKED_SOLO_5x5") || {};

    return new Response(JSON.stringify({
      summonerName: summoner.name,
      tier: soloQ.tier || "UNRANKED",
      rank: soloQ.rank || "",
      wins: soloQ.wins || 0,
      losses: soloQ.losses || 0
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch(e) {
    return new Response(JSON.stringify({ summonerName, tier: "ERROR", wins: 0, losses: 0 }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
