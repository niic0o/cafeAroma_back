const {
  createPrefenceController,
} = require("../controllers/mercadoPagoController");

const createPreferenceHandler = async (req, res) => {
  try {
    const mp = {
      items: req.body.map((item) => ({
        id: item._id,
        title: item.title,
        picture_url: item.img,
        description: item.description,
        quantity: Number(item.quantity),
        unit_price: Number(item.precio),
        currency_id: "ARS",
      })),
      back_urls: {
        success: "https://cafe-aroma.onrender.com/api/mercadoPago/return",
        failure: "https://fscorrales.github.io/failure_page/",
        pending: "https://fscorrales.github.io/pending_page/",
      },
      auto_return: "approved",
      statement_descriptor: "Café Aroma",
    };
    console.log(mp);
    const response = await createPrefenceController(mp);
    res.json({ id: response.id });
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const returnHandler = async (req, res) => {
  try {
    const { payment_id, status, external_reference, merchant_order_id } =
      req.query;

    // Aquí puedes procesar los datos recibidos
    console.log("Payment ID:", payment_id);
    console.log("Status:", status);
    console.log("External Reference:", external_reference);
    console.log("Merchant Order ID:", merchant_order_id);

    // Responde al cliente o redirige a una página de éxito
    res.redirect("https://fscorrales.github.io/success_page/"); // Redirige a una página de éxito en tu frontend
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

module.exports = {
  createPreferenceHandler,
  returnHandler,
};
