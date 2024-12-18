const {
  createPrefenceController,
  returnController,
} = require("../controllers/mercadoPagoController");
require("dotenv").config();

const createPreferenceHandler = async (req, res) => {
  try {
    const { orderId } = req.params;
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
        failure: "https://cafe-aroma.onrender.com/api/mercadoPago/return",
        pending: "https://cafe-aroma.onrender.com/api/mercadoPago/return",
      },
      auto_return: "approved",
      statement_descriptor: "Café Aroma",
      external_reference: orderId, // Aquí se envía la merchant_order_id
    };
    const response = await createPrefenceController(mp);
    res.json({ id: response.id });
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const returnHandler = async (req, res) => {
  try {
    const { payment_id, status, merchant_order_id, external_reference } =
      req.query;
    // Aquí puedes realizar las acciones necesarias en tu backend
    // Por ejemplo, actualizar el estado de la orden de compra en tu base de datos

    // Enviar una respuesta a Mercado Pago

    // Aquí puedes procesar los datos recibidos
    const order = await returnController(
      payment_id,
      status,
      merchant_order_id,
      external_reference
    );

    // payment_id	ID (identifier) of the payment from Mercado Pago.
    // status	Payment status. Ex.: approved for an approved payment or pending for pending payment.
    // external_reference	Amount sent at the time when the payment preference was created.
    // merchant_order_id	ID (identifier) of the payment order generated in Mercado Pago.

    // Responde al cliente o redirige a una página de éxito
    res.redirect(`${process.env.FRONTEND_URL}/MercadoPagoCallback/${status}`); // Redirige a una página de éxito en tu frontend
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

module.exports = {
  createPreferenceHandler,
  returnHandler,
};
