import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/Database.js";
import router from "./routes/router.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use(router);

// ====== SWAGGER ========
const swaggerOptions ={
    definition:{
        openapi: "3.0.0",
        info: {
            title: "Rozi Portofolio",
            version: "1.0.0",
            description: "Documentation API for Portofolio and Auth",
        },
        servers: [
            {
                url: process.env.BASE_URL || "http://localhost:5000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./routes/router.js"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {customCssUrl: CSS_URL}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running at port ${PORT} 🚀`));

export default app;