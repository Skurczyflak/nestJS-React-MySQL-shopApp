import { PrismaClient, Prisma } from '@prisma/client';
const db = new PrismaClient();

function getUsers() {
  return [
    {
      id: "35495389-4400-477a-ae38-8fa4ac2a3396",
      name: "Test Testowy",
      email: "tester@example.com",
      login: "tester",
      password: "SecurePass12!",
      isAdmin: false,
    }
  ];
}

function getCarts() {
  return [
    {
      id: "1c9da376-5012-479e-866a-92499a44fb79",
      userId: "35495389-4400-477a-ae38-8fa4ac2a3396",
    }
  ];
}

function getProducts() {
  return [
    {
      id: "1e84343f-316b-4274-a9e6-a3e36fd6a54f",
      name: "Cloth bag",
      title: "Cloth bag for groceries",
      description: "Cloth bag for groceries made from natural materials design to carry groceries and other small items.",
      shortDesc: "Natural cloth bag for groceries",
      colors: ["black", "blue", "yellow"] as Prisma.JsonArray,
      images: [
        "/images/products/bag_1.jpg",
        "/images/products/bag_2.jpg",
        "/images/products/bag_3.jpg",
      ] as Prisma.JsonArray,
      rating: 4,
      price: 7.99,
    },
    {
      id: "bf423c5a-198d-4a2b-bc7f-fc3590209835",
      name: "Coffee cup",
      title: "Handmade coffee cup",
      description: "Handmade coffe cup made to enjoy your favorite cup of coffee. Made from natural materials and with a unique design.",
      shortDesc: "coffe cup",
      colors: ["black", "blue", "white"] as Prisma.JsonArray,
      images: [
        "/images/products/coffe_cup_1.png",
        "/images/products/coffe_cup_2.png",
        "/images/products/coffe_cup_3.png",
      ] as Prisma.JsonArray,
      rating: 4.5,
      price: 12.99,
    },
    {
      id: "b7b8aad0-f859-4abc-b191-b311d73ed8c1",
      name: "Keychain",
      title: "Metal keychain",
      description: "Keychain made from metal and with a unique design. For your keys to show how much you love art.",
      shortDesc: "Metal keychain with a unique design",
      colors: ["silver", "gold"] as Prisma.JsonArray,
      images: [
        "/images/products/keychain_1.jpg",
        "/images/products/keychain_2.jpg",
      ] as Prisma.JsonArray,
      rating: 4,
      price: 5.99,
    },
    {
      id: "8dc27fc5-e6fa-4be4-b84c-8c311727ed95",
      name: "T-shirt for men",
      title: "Simple T-shirt",
      description: "T-shirt for men made from natural materials with simple design and comfortable fit.",
      shortDesc: "T-shirt for men with simple design",
      colors: ["black", "white", "yellow"] as Prisma.JsonArray,
      images: [
        "/images/products/t_shirt_1.jpg",
        "/images/products/t_shirt_2.jpg",
        "/images/products/t_shirt_3.jpg",
      ] as Prisma.JsonArray,
      rating: 5,
      price: 30,
    },
  ];
}

function getOrders() {
  return [];
}

function getCartItems() {
  return [];
}

async function seed() {

  console.log("Adding Users");
  await db.user.createMany({ data: getUsers() });

  console.log("Adding Carts");
  await db.cart.createMany({ data: getCarts() });

  console.log("Adding Products");
  await db.product.createMany({ data: getProducts() });

  console.log("Adding Cart Items");
  await db.cartItem.createMany({ data: getCartItems() });

  console.log("Adding Orders");
  await db.order.createMany({ data: getOrders() });

  console.log("Finished !!!");
}

seed()
  .catch((e) => {
    console.error("Error while seeding: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });