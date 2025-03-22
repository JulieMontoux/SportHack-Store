const achievements = [];

exports.getScore = (req, res) => {
  res.json({ achievements });
};

exports.addAchievement = (req, res) => {
  const { label } = req.body;
  if (!achievements.includes(label)) achievements.push(label);
  res.json({ message: "Succès ajouté", achievements });
};
