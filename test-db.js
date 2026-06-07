const { createClient } = require("@insforge/sdk");

const insforge = createClient({
  baseUrl: "https://ynvxwe6g.ap-southeast.insforge.app",
  anonKey: "ik_1a28d85ec7891dbf1ec00874862060f2",
});

async function run() {
  const { data, error } = await insforge.database.from("order_items").insert([{
    id: "54bdc824-dc24-4fc7-802c-7b4435889ee7",
    order_id: "TRX-1700",
    product_id: "1bf2efea-1ed2-4f32-8df7-e9a6566b73eb", // an existing product or fake
    price: 10000,
    quantity: 1
  }]);
  console.log("Error:", error);
}

run();
