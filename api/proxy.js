export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwFYfsZ4CpN9vCvXxhYMNGHlxApXQcZEO_RaRshGNANOrFjTh7BRNPtqIxJtVx6IQxJ/exec"
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
