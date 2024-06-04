const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Manuales"},
            ]
        });
        console.log("Exito");
    } catch (error) {
        console.error("Error llenando la base de datos categorias", error);
    } finally {
        await database.$disconnect();
    }
}

main();