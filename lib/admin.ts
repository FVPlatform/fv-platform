export const isAdmin = (userId?: string | null) => {
    // Obtener la lista de IDs de administrador desde la variable de entorno
    const adminIds = process.env.NEXT_PUBLIC_ADMIN_ID?.split(",").map(id => id.trim()) || [];

    // Verificar si el userId está presente en la lista de IDs de administrador
    return userId && adminIds.includes(userId);
}