'use strict'

import connection from '../db/dbConfig.js';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const filename = path.basename(__filename);

export const up = function (next) {
    const sql = `
    INSERT INTO productos (id_categoria, nombre, precio, cantidad, popularidad, id_tienda, img_path, descripcion) VALUES 
	(1,'Panchos de Cocodrilo',109.00,10,1,1, '/uploads/cocodrilo.jpg', '¡Atrévete a probar algo exótico con nuestros Panchos de Cocodrilo! Esta delicia única combina la suculenta carne de cocodrilo con un toque de especias que resaltan su sabor distintivo. Perfectos para los aventureros culinarios, estos hotdogs no solo son sabrosos, sino también una excelente fuente de proteínas magras. Ideal para sorprender a tus invitados o para disfrutar de una comida diferente y emocionante.'),
	(1,'Panchos de Salchicha',45.99,9,2,1, '/uploads/normal.jpg','Los Panchos de Salchicha son un clásico que nunca pasa de moda. Elaborados con salchichas de alta calidad, estos hotdogs son jugosos y llenos de sabor. Perfectos para una parrillada con amigos o una comida rápida y satisfactoria en cualquier momento del día. Añade tus condimentos favoritos y disfruta de un pancho tradicional que siempre complace a todos los paladares.'),
	(1,'Panchos de Carne',79.99,90,3,1, '/uploads/res.jpg', 'Nuestros Panchos de Carne son una auténtica delicia para los amantes de la carne. Hechos con carne de res de primera, estos hotdogs son jugosos, tiernos y llenos de sabor. Ideales para una comida abundante, ya sea en una reunión familiar o simplemente cuando tienes antojo de algo contundente. Añade cebolla caramelizada, queso y tus salsas preferidas para un festín inolvidable.'),
	(1,'Panchos de Pollo',95.00,15,4,1, '/uploads/pollo.jpg', 'Disfruta de la suavidad y el sabor ligero de los Panchos de Pollo. Estos hotdogs son una opción más saludable pero igualmente deliciosa, perfectos para quienes buscan una alternativa a la carne roja. Con un toque de especias y hierbas, estos panchos son ideales para cualquier ocasión, desde una barbacoa en el jardín hasta una comida rápida y nutritiva.'),
	(1,'Panchos de Cerdo',55.99,12,5,1, '/uploads/cerdo.jpg', 'Los Panchos de Cerdo son la elección perfecta para aquellos que aman el sabor rico y jugoso de la carne de cerdo. Con un toque de especias que resalta su sabor natural, estos hotdogs son ideales para una comida reconfortante y sabrosa. Perfectos para acompañar con chucrut, mostaza y un buen pan, estos panchos te harán volver por más.'),

	(1,'Tacos de pastor (5)',69.99,10,1,2, '/uploads/tacosPastor.jpg', 'Sumérgete en el auténtico sabor de México con nuestros tacos de pastor. Preparados con finas láminas de carne de cerdo marinada en una mezcla de chiles y especias tradicionales, estos tacos ofrecen una explosión de sabores ahumados y picantes que deleitarán tu paladar. Cada bocado es una experiencia única, perfecta para disfrutar en cualquier momento del día'),
	(1,'Tacos de canasta (3)',35.99,9,2,2, '/uploads/tacosCanasta.jpeg','Nuestros tacos de canasta son una delicia que captura la esencia de la cocina mexicana callejera. Llenos de auténticos guisos como papas con chorizo, frijoles refritos, y chicharrón prensado, cada taco ofrece una combinación irresistible de sabores y texturas. Perfectos para compartir con amigos o disfrutar en solitario durante una comida rápida y sabrosa.'),
	(1,'Tacos campechanos (3)',50.00,12,3,2, '/uploads/tacosCampechanos.jpeg', 'Los tacos campechanos son una verdadera indulgencia para los amantes de la carne. Preparados con una mezcla generosa de cortes de carne como bistec, chorizo y tocino, estos tacos están sazonados con especias tradicionales que realzan su sabor robusto y jugoso. Cada taco es una fiesta de sabores, perfecto para aquellos que buscan una comida abundante y satisfactoria.'),
	(1,'Taco arabe',50.00,15,4,2, '/uploads/tacosArabes.jpg', 'Disfruta de la fusión de sabores en nuestro taco árabe, una deliciosa opción inspirada en la cocina mediterránea. Elaborado con finas tiras de carne de pollo marinada en una mezcla de especias exóticas y cocinada a la perfección en un proceso que garantiza su jugosidad y ternura. Cada bocado es una experiencia gastronómica única que te transportará a tierras lejanas con su sabor fresco y aromático.'),
	(1,'Tacos de bistec (5)',59.99,12,5,2, '/uploads/tacosBistec.jpg', 'Nuestros tacos de bistec son una celebración de la carne de res de primera calidad. Preparados con trozos jugosos de bistec sazonados con especias cuidadosamente seleccionadas, cada taco ofrece un equilibrio perfecto entre ternura y sabor. Acompañados de cebolla, cilantro y limón, estos tacos son ideales para aquellos que buscan una experiencia culinaria auténtica y satisfactoria.'),

	(1,'Pizza napolitana',269.99,10,1,3, '/uploads/pizzaNapolitana.jpg', 'Disfruta de la auténtica pizza napolitana, una obra maestra culinaria con una historia rica y sabrosa. Esta pizza clásica está hecha con una base de masa fina y crujiente, cubierta con una salsa de tomate fresca y aromática, mozzarella de alta calidad, albahaca fresca y un toque de aceite de oliva virgen extra. Cada bocado te transportará a las calles de Nápoles con su sabor auténtico y tradicional.'),
	(1,'Pizza Capricciosa (3)',299.99,9,2,3, '/uploads/pizzaCapricciosa.jpg','La Pizza Capricciosa es una deliciosa combinación de sabores y texturas que hará las delicias de cualquier amante de la pizza. Con una base de masa perfectamente horneada, esta pizza está cubierta con salsa de tomate, mozzarella, champiñones frescos, alcachofas, jamón y aceitunas. Cada ingrediente se mezcla armoniosamente para crear una experiencia gastronómica rica y satisfactoria.'),
	(1,'Pizza Quattro Formaggi (3)',350.00,3,3,3, '/uploads/pizzaQuatro.jpg', 'La Pizza Quattro Formaggi es un verdadero deleite para los amantes del queso. Esta pizza está cubierta con una mezcla de cuatro quesos exquisitos: mozzarella, gorgonzola, parmesano y queso de cabra. La combinación de estos quesos crea una sinfonía de sabores ricos y cremosos que se derriten en tu boca con cada bocado. Perfecta para aquellos que buscan una experiencia indulgente y sabrosa.'),
	(1,'Pizza Vegetariana',350.00,15,4,3, '/uploads/pizzaVeg.jpg', 'Nuestra Pizza Vegetariana es una opción fresca y saludable que no compromete el sabor. Hecha con una base de masa artesanal, está cubierta con una generosa cantidad de verduras frescas y coloridas como pimientos, champiñones, cebolla, tomate, espinacas y aceitunas. Cada bocado es una explosión de frescura y sabor, perfecta para aquellos que buscan una opción deliciosa y nutritiva.'),
	(1,'Pizza Hawaiana ',180.99,12,5,3, '/uploads/pizzaHaw.jpg', 'La Pizza Hawaiana es una deliciosa fusión de sabores dulces y salados. Con una base de masa esponjosa y perfectamente horneada, está cubierta con salsa de tomate, mozzarella, jamón y trozos jugosos de piña. Esta combinación única crea una experiencia gastronómica exótica y satisfactoria, ideal para aquellos que buscan algo diferente y delicioso.'),

	(1,'Salbutes (3)',50.00,10,1,4, '/uploads/salbutes.jpg', 'Los salbutes son una auténtica delicia de la gastronomía yucateca. Estos antojitos están hechos con tortillas de maíz ligeramente fritas hasta quedar crujientes, y están cubiertos con una variedad de ingredientes frescos y sabrosos como lechuga, tomate, cebolla morada y pollo desmenuzado. Cada bocado es una explosión de sabor que te transportará a las cálidas tierras del sur de México.'),
	(1,'Empanadas',35.99,9,2,4, '/uploads/empanadas.jpg','Los panuchos son una especialidad yucateca que te encantará. Estos antojitos están hechos con tortillas de maíz rellenas de frijoles refritos, y están cubiertos con pollo, lechuga, tomate, cebolla morada y aguacate. Cada panucho es una combinación perfecta de sabores frescos y crujientes, ideal para una comida rápida y deliciosa.'),
	(1,'Sopes (3)',60.00,12,3,4, '/uploads/sopes.jpg', 'Los panuchos son una especialidad yucateca que te encantará. Estos antojitos están hechos con tortillas de maíz rellenas de frijoles refritos, y están cubiertos con pollo, lechuga, tomate, cebolla morada y aguacate. Cada panucho es una combinación perfecta de sabores frescos y crujientes, ideal para una comida rápida y deliciosa.'),
	(1,'Huaraches',35.00,15,4,4, '/uploads/huaraches.jpg', 'Los panuchos son una especialidad yucateca que te encantará. Estos antojitos están hechos con tortillas de maíz rellenas de frijoles refritos, y están cubiertos con pollo, lechuga, tomate, cebolla morada y aguacate. Cada panucho es una combinación perfecta de sabores frescos y crujientes, ideal para una comida rápida y deliciosa.'),
	(1,'Panuchos (5)',74.99,12,5,4, '/uploads/panuchos.jpg', 'Los panuchos son una especialidad yucateca que te encantará. Estos antojitos están hechos con tortillas de maíz rellenas de frijoles refritos, y están cubiertos con pollo, lechuga, tomate, cebolla morada y aguacate. Cada panucho es una combinación perfecta de sabores frescos y crujientes, ideal para una comida rápida y deliciosa.'),
	
	(1,'Torta de huevo',59.99,10,1,5, '/uploads/tortaHuevo.jpg', 'Nuestra torta de huevo es una opción clásica y reconfortante. Hecha con pan crujiente y rellena de huevo preparado al gusto, ya sea revuelto, estrellado o en omelette. Acompañada de aguacate, jitomate y frijoles refritos, esta torta es perfecta para un desayuno o almuerzo nutritivo y sabroso.'),
	(1,'Torta de chilaquil',69.99,9,2,5, '/uploads/tortaChilaquil.jpeg','La torta de chilaquil es una deliciosa fusión de sabores mexicanos. Hecha con chilaquiles verdes o rojos, cubiertos con crema, queso y cebolla, y servida en un pan crujiente. Cada bocado ofrece una combinación única de texturas y sabores que te harán querer más.'),
	(1,'Torta de tamal',75.00,12,3,5, '/uploads/abominacion.jpeg', 'La torta de tamal es una especialidad de la Ciudad de México que no te puedes perder. Hecha con un tamal tradicional (ya sea de rajas, verde, rojo o dulce) dentro de un bolillo crujiente. Esta torta es una opción contundente y deliciosa, perfecta para aquellos que buscan una comida reconfortante y satisfactoria.'),
	(1,'Torta de pastor',50.00,15,4,5, '/uploads/tortaPastor.jpg', 'Nuestra torta de pastor es una explosión de sabores. Hecha con carne al pastor marinada en una mezcla de chiles y especias, servida en un pan crujiente y acompañada de piña, cilantro, cebolla y salsa. Cada bocado te transportará a las taquerías de México con su sabor auténtico y delicioso.'),
	(1,'Torta cubana ',89.99,12,5,5, '/uploads/tortaCubana.jpg', 'La torta cubana es una verdadera fiesta de sabores. Rellena de una variedad de carnes como jamón, milanesa, salchicha y chorizo, además de queso, aguacate, tomate, jalapeños y frijoles. Esta torta es grande, sabrosa y perfecta para aquellos con un gran apetito. Cada bocado es una experiencia deliciosa y satisfactoria.');
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
