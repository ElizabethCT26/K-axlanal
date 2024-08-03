'use strict'

import connection from '../db/dbConfig.js';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const filename = path.basename(__filename);

export const up = function (next) {
    const sql = `
        INSERT INTO tiendas (nombre, eslogan, id_propietario, contacto, id_img, descripcion, id_areaComercial) VALUES 
        ("El Rey del Pancho", "¡Reinando Supremo en Sabor!", 1, '9983242074', 1,'Bienvenido a El Rey del Pancho, el lugar donde los amantes de los hotdogs encuentran su paraíso culinario. Nuestra tienda se especializa en ofrecer una variedad única y deliciosa de panchos, desde los clásicos hasta los más exóticos. Cada uno de nuestros productos está hecho con ingredientes de la más alta calidad para garantizar un sabor y una experiencia inigualables. Ya sea que busques una comida rápida y sabrosa o quieras sorprender a tus amigos y familiares con algo diferente, El Rey del Pancho es tu destino ideal. ¡Ven y descubre el verdadero sabor de los panchos!', 1),
        ('Tacos "El tommy"', "¡La Fiesta de Sabor Comienza Aquí!", 2, '9984117524', 2,'Bienvenido a Tacos "El Tommy", donde los auténticos sabores mexicanos cobran vida. Nuestra especialidad son los tacos, preparados con ingredientes frescos y auténticos que te transportarán a las calles de México. Desde tacos al pastor hasta tacos de cochinita pibil, cada bocado es una explosión de sabor. Perfectos para cualquier ocasión, nuestros tacos te harán regresar por más. ¡Ven y disfruta de la verdadera experiencia de tacos en "El Tommy"!', 1),
        ('Pizzas al carbon Augustus', "¡Encendiendo el Sabor!", 3,'9983242074',  3, 'Descubre el arte de la pizza cocinada al carbón en Pizzas al Carbón Augustus. Nuestras pizzas, con su sabor y textura únicos, son una verdadera delicia. Usamos ingredientes frescos y de alta calidad para crear combinaciones deliciosas y auténticas. Ya sea que prefieras una clásica Margherita o algo más aventurero como una pizza con ingredientes gourmet, Augustus es tu destino ideal. ¡Ven y descubre el auténtico sabor de las pizzas al carbón!', 1),
        ('Antojitos "El chava', "¡Tu Paraíso de Antojos!", 4, '9984117524', 4,'Déjate tentar por los sabores irresistibles de Antojitos "El Chava". Aquí encontrarás una amplia variedad de delicias tradicionales mexicanas, desde sopes y gorditas hasta quesadillas y tlacoyos, todo hecho con amor y los mejores ingredientes. Perfectos para una comida rápida y deliciosa o para compartir con amigos y familiares. En "El Chava", cada bocado es una celebración de la rica cultura culinaria de México. ¡Ven y satisface tus antojos con nosotros!', 1),
        ('Tortonas el buey', "¡Más Grandes, Mejores, y Audaces!", 5, '9983242074', 5,'Experimenta la grandeza de las tortas en Tortonas "El Buey", donde cada bocado es una explosión de sabor. Nuestras tortas son grandes, sabrosas y llenas de los mejores ingredientes. Desde la clásica torta de jamón hasta nuestras especialidades con carnes marinadas y vegetales frescos, cada opción es una delicia. Perfectas para un almuerzo contundente o una cena satisfactoria, nuestras tortas te dejarán completamente satisfecho. ¡Ven y descubre por qué somos el lugar favorito para las tortas en la ciudad!', 1);
    `;

    connection.query(sql, (err, res) => {
        if (err) {
        console.error(`Error running migration at: ${chalk.cyan(filename)} > ${chalk.cyan('up')}`);
        throw err;
        }
        next();
    });
};

export const down = function (next) {
    const sql = `DROP TABLE `;

    connection.query(sql, (err, res) => {
        if (err) {
        console.error(`Error running migration at: ${chalk.cyan(filename)} > ${chalk.cyan('down')}`);
        throw err;
        }
        next();
    });
};
