# ☕ Cafe Aroma Version: 1.0.0
## Descripción
**Cafe Aroma** es una aplicación que permite a los usuarios elegir productos, solicitar a través de un carrito de compras, una órden para consumir y pagarla a través de Mercado Pago. La aplicación incluye funcionalidades de inicio de sesión, registro de usuario, modificación de datos, páginas informátivas y herramientas específicas para el administrador del negocio que permiten subir sus propios productos, reestablecer clientes y ver órdenes de compra entre otras funciones más. Para la próxima versión se incluirán nuevas funcionalidades.

## Documentación (Funcionalidades de la API REST)
Para conocer los métodos HTTP disponibles a ser consumidos y el Schema de datos puedes acceder a la documentación desarrollada en **Swagger.UI** aquí se muestran la totalidad de funcionalidades: [Documentación de API](https://cafe-aroma.onrender.com/docs/).
- **37 Funcionalidades**:
    - Users, Products, Orders, Pay, Login, Comments.
- **Navegación**:
    - No han sido contadas las rutas de navegación que pueden contener funcionalidades extras.
## Funcionalidades Destacadas
- **Billetera Virtual**: Integración con **Mercado Pago** para facilitar los pagos.
- **Validaciones**: Implementación de validaciones completas en los campos para mantener la consistencia de los datos.
- **Seguridad**: Uso de **JWT** (JSON Web Tokens) para mantener la integridad de las sesiones.
- **Comentarios**: Posibilidad de enviar comentarios sobre los productos.
- **Administración**: Herramientas para la gestión de usuarios, orednes y productos.
- **Interfaz de Usuario**: Uso de componentes de Bootstrap y css con colores temáticos para la agradable e intuitiva navegación del usuario.
## Despliegue (Página Web)
La aplicación está disponible en el siguiente enlace: [Página Web Cafe Aroma](https://cafe-aroma-sand.vercel.app/)

## Metodología de Trabajo
- **Metodología**: Agile: Scrum
- **Ciclo de Vida**: (ver apartado)
- **Equipo**: (max | med | min)

  - **Nicolas Sena**: (Backend | Scrum Master | Frontend) 
    [![LinkedIn](https://img.shields.io/badge/LinkedIn-Nicolas_Sena-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/nicol%C3%A1s-ariel-sena-68119433a/) 
    [![GitHub](https://img.shields.io/badge/GitHub-Nicolas_Sena-black?style=for-the-badge&logo=github)](https://github.com/niic0o/)
  
  - **Fernando Corrales**: (Backend | Data Analyst | Frontend) 
    [![LinkedIn](https://img.shields.io/badge/LinkedIn-Fernando_Corrales-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/corralesfernando) 
    [![GitHub](https://img.shields.io/badge/GitHub-Fernando_Corrales-black?style=for-the-badge&logo=github)](https://github.com/fscorrales)
  
  - **Gonzalo Rodriguez**: (Frontend | Git Administrator | Product Owner) 
    [![LinkedIn](https://img.shields.io/badge/LinkedIn-Gonzalo_Rodriguez-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/gonzalo-rodriguez) 
    [![GitHub](https://img.shields.io/badge/GitHub-Gonzalo_Rodriguez-black?style=for-the-badge&logo=github)](https://github.com/Alcalixo)
  
  - **Leo Canteros**: (Backend | Data Modeler | Frontend) 
    [![LinkedIn](https://img.shields.io/badge/LinkedIn-Leo_Canteros-blue?style=for-the-badge&logo=linkedin)](faltacompletar) 
    [![GitHub](https://img.shields.io/badge/GitHub-Leo_Canteros-black?style=for-the-badge&logo=github)](https://github.com/leonardo-canteros)
  
  - **Juan Ignasio Meza**: (Frontend | Brand Design | Product Owner) 
    [![LinkedIn](https://img.shields.io/badge/LinkedIn-Juan_Ignasio_Meza-blue?style=for-the-badge&logo=linkedin)](faltacompletar) 
    [![GitHub](https://img.shields.io/badge/GitHub-Juan_Ignasio_Meza-black?style=for-the-badge&logo=github)](faltacompletar)
## Duración del proyecto: 
 **32 días**
 El backlog se inició con un "brainstorming" donde extraímos los principales requerimientos funcionales y no funcionales Hemos utilizado a **Git Hub** como herramienta de versionado. Utilizamos **Google Meet** para reuniones diarias y un grupo de **WhatsApp** para la comunicación en tiempo real trabajando 100% remoto con una dedicación aproximada de media entre 6 y 12 horas diarias.
 Puedes ver nuestro tablero en Trello: [Tablero Kanban Cafe Aroma](https://trello.com/b/bii8xJoY/tablero-kanban-cafe-aroma-desarrollo)

## Ciclo de Vida del Software

1. **Recolección de Requisitos**:
   - **Identificación de Requisitos Funcionales y No Funcionales**: Utilización de técnica de **brainstorming** para extraer los requisitos necesarios para el proyecto.

2. **Planificación y Diseño**:
   - **División del Equipo**: Se dividió el equipo en dos grupos: uno para el desarrollo del backend y otro para el frontend, en metodología del trabajo se describe la dedicación de máximo a minímo para el rol que a cada uno le toco ocupar, las tareas solicitaban una duracion de 2 a 3 días, el testing se realizó de manera conjunta al desarrollo, esto permitió la generación de código robusto. Antes de iniciar el desarrollo de la api se diseñaron los Diagramas Entidad Relacion necesarios para los modelos de datos.
   - **Reuniones Diarias y Uso de Trello**: Se llevaron a cabo reuniones diarias para coordinar el progreso y resolver problemas. Se utilizó **Trello** para gestionar tareas y el flujo de trabajo del proyecto.

3. **Desarrollo**:
   - **Desarrollo del Backend**: Se inició el desarrollo del backend utilizando Node.js y Express.js. La base de datos MongoDB, se usaron Vercel y Render para el despliegue y una serie de dependencias incluidas en package.json.
   - **Desarrollo del Frontend**: El equipo de frontend comenzó a trabajar en la interfaz de usuario utilizando React.js. con sus respectivas dependencias.

4. **Pruebas**:
   - **Pruebas del Backend**: Se utilizó **Postman** y **Thunder Client** para realizar pruebas en el backend.
   - **Pruebas del Frontend**: Se utilizó **DevTools** de Google Chrome para probar el frontend.

5. **Integración y Revisión**:
   - **Revisión entre Equipos**: Se realizó una revisión entre los equipos de backend y frontend para asegurarse de que todo funcionara correctamente. Esto incluyó ajustes en el backend para facilitar la integración con el frontend. Fue necesario

6. **Despliegue**:
   - **Despliegue de la API**: Una vez que la API estuvo terminada y probada, se realizó el despliegue del back en **Render** y en **Vercel** del front.
   - **Enfoque en el Frontend**: Después del despliegue de la API, el equipo se enfocó en finalizar el desarrollo del frontend antes de la entrega final.

7. **Soporte y Escalabilidad**:

   Se espera en un futuro cercano coordinar con el equipo para explotar las facilidades del desarrollo modularizado anexando nuevas funcionalidades que permita desplegar la aplicación como solución real a las cafeterias del país.
## Tecnologías Utilizadas
Desarrollado utilizando la tecnología **MERN** (MongoDB, Express.js, React.js, Node.js). Desarrollado en **Visual Studio Code**

## Diseño Arquitectónico

La arquitectura de **Cafe Aroma** se basa en un enfoque **MERN** (MongoDB, Express.js, React.js, Node.js), que permite una integración fluida entre el frontend y el backend. A continuación, se describen las partes del sistema y cómo interactúan entre sí:

### Componentes del Sistema

1. **Frontend (React.js)**:
   - La interfaz de usuario está construida con **React**, lo que permite una experiencia de usuario dinámica y responsiva. Los componentes de React se encargan de renderizar la interfaz, gestionar el estado de la aplicación y manejar la interacción del usuario.
   - Utiliza **React Router** para la navegación entre diferentes vistas, como la página de inicio, el menú de productos, el carrito de compras y la sección de administración.

2. **Backend (Node.js y Express.js)**:
   - El backend está desarrollado en **Node.js** utilizando **Express.js** como framework. Este componente se encarga de manejar las solicitudes HTTP, procesar la lógica de negocio y comunicarse con la base de datos.
   - La API REST expone endpoints que permiten al frontend realizar operaciones como crear, leer, actualizar y eliminar (CRUD) productos y usuarios.

3. **Base de Datos (MongoDB)**:
   - **MongoDB** se utiliza como base de datos NoSQL para almacenar la información de los productos, usuarios y pedidos. Su estructura flexible permite una fácil adaptación a los cambios en los requisitos del sistema.
   - La comunicación entre el backend y la base de datos se realiza a través de **Mongoose**, que proporciona un esquema para los datos y facilita las operaciones de base de datos.

### Interacción entre Componentes

- **Comunicación entre Frontend y Backend**:
  - El frontend se comunica con el backend a través de solicitudes HTTP (GET, POST, PATCH, PUT, DELETE) a la API REST. Por ejemplo, cuando un usuario ingresa sus datos para registrarse, se envía una solicitud POST al backend para crear un nuevo usuario.
  - Las respuestas del backend se manejan en el frontend para actualizar la interfaz de usuario, mostrando mensajes de éxito o error según sea necesario.

- **Autenticación y Seguridad**:
  - Se implementa un sistema de autenticación utilizando **JSON Web Tokens (JWT)**. Al iniciar sesión, el usuario recibe un token que se almacena en el cliente y se envía con cada solicitud para verificar la identidad del usuario y mantener la seguridad de las operaciones, este token funciona como credencial para permitir acceso a ciertas funcionalidades.

- **Validaciones y Consistencia de Datos**:
  - Se utiliza un middleware con joi para validar los datos necesarios antes de enviarselo al controlador, la base de datos contiene restricciones para asegurar que los datos ingresados por los usuarios sean consistentes y cumplan con los requisitos del sistema.

### Conclusión

Esta arquitectura permite una experiencia de usuario fluida y eficiente, facilitando la gestión de datos y la interacción con el backend. La separación de responsabilidades entre el frontend y el backend, junto con el uso de tecnologías modernas, asegura que **Cafe Aroma** sea escalable y fácil de mantener.

## Compatibilidad
La aplicación es compatible con pantallas grandes y dispositivos móviles utilizando navegadores como Google Chrome y Firefox entre otros.

## Agradecimientos
Agradecemos a **Martin Juncos**, nuestro profesor, y al equipo de **Polo IT + Telco + UNNE**, así como a todos los que hicieron posible el curso de **Talentos Digitales 2024**. También a este gran equipo de trabajo que en muy poco tiempo logró implementar importantes funcionalidades, considerando que nuestra experiencia en tecnologías MERN era totalmente nueva.


¡Gracias por tu interés en **Cafe Aroma**! Esperamos que disfrutes de nuestra aplicación.

## Extra
Para instalar en localhost: npm install
Para inicializar el servidor en la terminal: npm run dev
Luego clonar el repositorio front.
npm install, luego npm start, configurar .env solicitando claves a cualquier miembro del equipo.
Para verlo funcionando en la web: https://cafe-aroma-sand.vercel.app/


