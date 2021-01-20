

// Defined routes
app.get('/', (req, res) => {
  res.send('Curated API')
})

// Gets exhibitions
app.get('/exhibitions', async (req, res) => {
  try {
    const exhibitions = await Exhibition.find()
    return res.status(200).json(exhibitions)
  } catch (err) {
    return res.status(400).json({ message: 'Could not get exhibitions', error: err }) // 400 bad request
  }
})

// Creates exhibition
app.post('/exhibitions', async (req, res) => {
  try {
    const { title, artists, museum, startDate, endDate, link } = req.body
    const exhibition = await new Exhibition({ title, artists, museum, startDate, endDate, link }).save()
    res.status(201).json(exhibition)
  } catch (err) {
    res.status(400).json({ message: 'Could not create exhibition', error: err.message })
  }
})

// Updates exhibition
app.patch('/exhibitions/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, museum, artists, startDate, endDate, link } = req.body
    const exhibition = await Exhibition.updateOne({ _id: id }, { title, museum, artists, startDate, endDate, link }, { runValidators: true })
    res.status(202).json(exhibition)
  } catch (err) {
    res.status(404).json({ message: 'Could not find exhibition', error: err.message }) // 404 not found
  }
})

// Deletes exhibition
app.delete('/exhibitions/:id', async (req, res) => {
  try {
    const { id } = req.params
    const exhibition = await Exhibition.deleteOne({ _id: id })
    res.status(200).json(exhibition)
  } catch (err) {
    res.status(404).json({ message: 'Could not find exhibition', path: err.path, value: err.value })
  }
})