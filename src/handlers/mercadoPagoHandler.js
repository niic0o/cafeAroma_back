const {
  createPrefenceController,
} = require("../controllers/mercadoPagoController");

const createPreferenceHandler = async (req, res) => {
  try {
    const mp = {
      items: req.body.map((item) => ({
        title: item.title,
        quantity: Number(item.quantity),
        unit_price: Number(item.precio),
        currency_id: "ARS",
      })),
      back_urls: {
        success: "https://martin-juncos.github.io/success/",
        failure: "https://martin-juncos.github.io/failure/",
        pending: "https://martin-juncos.github.io/pending/",
      },
      auto_return: "approved",
    };
    const response = await createPrefenceController(mp);
    res.json({ id: response.id });
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

module.exports = {
  createPreferenceHandler,
};
