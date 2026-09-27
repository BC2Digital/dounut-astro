import type { APIRoute } from "astro";
import { createOrder } from "../../use-cases/mutations/create-order";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  try {
    const pedido = await createOrder(data);
    return new Response(JSON.stringify({ id: pedido.id }), {
      headers: { "content-type": "application/json;charset=UTF-8" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "content-type": "application/json;charset=UTF-8" },
    });
  }
};
