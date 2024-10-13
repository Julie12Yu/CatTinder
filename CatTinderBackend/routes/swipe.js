async function swipe(req, res) {
    const { userId, catId, direction } = req.body;
    const newSwipe = new Swipe({ userId, catId, direction });
    try {
      await newSwipe.save();
      res.status(201).json(newSwipe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}