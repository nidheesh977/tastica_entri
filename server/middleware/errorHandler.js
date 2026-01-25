

export const errorHandler = (err, req, res, next) => {

    const isDev = process.env.NODE_ENV === "development"

    const response = {
        success: false,
        message: isDev ? err.message : "Internal server error",
    }

    if (isDev) {
        response.stack = err.stack
    }

    res.status(err.statusCode || 500).json(response)
}