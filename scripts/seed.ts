const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Vuelos"},
                { name: "Parques"},
                { name: "Hotelería"},
                { name: "Charter"},
                { name: "Empaquetado"},
                { name: "Producto nacional"},
                { name: "Bodas"},
                { name: "Educación"},
                { name: "Tours"},
                { name: "Cuba"},
                { name: "CHARTER GO"},
                { name: "XV años"},
                { name: "Seguros"},
                { name: "Cruceros"},
                { name: "Eventos"},
                { name: "NATURLEON"},
                { name: "Disney"},
                { name: "Tours internacionales"},
                { name: "Autos"},
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