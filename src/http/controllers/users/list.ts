export async function list(req, res) {
  const users = []
  return res.status(201).send(users)
}
