<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Ejecutar en desarrollo

1. Clonar el proyecto

2. Copiar el `.env.template` y renombrar a `.env`

3. Ejecutar

```
yarn install
```

4. levantar la imagen (Docker desktop)

```
docker-compose up -d
```

5. Levantar el backend de Nest

```
yarn start:dev
```

6. Visitar el sitio

```
http://localhost:3000/graphql
```

# Ejecutar la imagen de la aplicacion

Esta aplicacion maneja productos que son creados y agregados a sus respectivas listas de compra, esto segun la creacion de cada usuario.

### Credenciales de prueba para el login

```JSON
{
  "email": "francisco@google.com",
  "password": "123456"
}
```

## Pasos para poder probar la aplicacion

1. Ejecutar el siguiente comando (necesitas tener docker corriendo)

- Esto descargara la imagen de la aplicacion y levantara la misma.
- Esto es suficiente para iniciar las pruebas

```
docker run --env-file=.env.prod -p 8080:4000 fmyersdev/nest-graphql-prod:1.0.0
```

2. Ingresa al endpoint

```
http://localhost:8080/graphql
```
