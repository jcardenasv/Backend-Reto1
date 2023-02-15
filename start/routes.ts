/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.group(() => {
  // Usuarios
  Route.get("/listar-usuarios", "UsuariosController.getListarUsuarios");
  Route.post("/registro-usuarios", "UsuariosController.setRegistrarUsuario");
  Route.get("/buscar-id/:id", "UsuariosController.buscarPorId");
  Route.put("/actualizar/:id", "UsuariosController.actualizarUsuario");
  Route.delete("/eliminar-usuario/:id", "UsuariosController.eliminarUsuario");
  Route.get("/filtrar-usuario/", "UsuariosController.filtroPorNombre");

  // Grupos
  Route.post("/registro-grupo", "GruposController.setRegistrarGrupo");

  // UsuarioGrupo
  Route.post("/registro-usuario-grupo", "GrupoUsuariosController.setRegistrarUsuarioGrupo");

  // Perfiles
  Route.post("/registro-perfil", "PerfilsController.setRegistrarPerfil");

  // Publicaciones
  Route.post("/registro-publicacion", "PublicacionesController.setRegistroPublicacion");
}).prefix("/api");
