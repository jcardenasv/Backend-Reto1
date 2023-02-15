import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Usuario from "App/Models/Usuario";

export default class UsuariosController {
  public async setRegistrarUsuario({ request, response }: HttpContextContract) {
    const dataUsuario = request.only([
      "codigo_usuario",
      "nombre_usuario",
      "contrasena",
      "email",
      "telefono",
      "perfil",
    ]);
    try {
      const codigoUsuario = dataUsuario.codigo_usuario;
      const usuarioExistente: Number = await this.getValidarUsuarioExistente(
        codigoUsuario
      );
      if (usuarioExistente === 0) {
        await Usuario.create(dataUsuario);
        response.status(200).json({ msg: "Registro completo con exito" });
      } else {
        response.status(400).json({ msg: "Error, codigo existente" });
      }
    } catch (error) {
      response.status(500).json({ msg: "Error en el servidor" });
    }
  }

  private async getValidarUsuarioExistente(
    codigoUsuario: Number
  ): Promise<Number> {
    const total = await Usuario.query()
      .where({ codigo_usuario: codigoUsuario })
      .count("*")
      .from("usuarios");
    return parseInt(total[0]["count(*)"]);
  }

  public async getListarUsuarios(): Promise<Usuario[]> {
    const user = await Usuario.all();
    return user;
  }

  public async buscarPorId({ request }: HttpContextContract) {
    const id = request.param("id");
    const user = await Usuario.find(id);
    return user;
  }

  public async actualizarUsuario({ request }: HttpContextContract) {
    // No actualiza el campo update_at en la BD
    // const id = request.param('id');
    // const user = request.all();
    // await Usuario.query().where('codigo_usuario', id).update({
    //     nombre_usuario: user.nombre,
    //     contrasena: user.contrasena,
    //     email: user.email,
    //     telefono: user.telefono,
    // })
    // return {"mensaje":"Actualizado correctamente", "estado":200};

    const id = request.param("id");
    const usuario = await Usuario.findOrFail(id);
    const datos = request.all();
    (usuario.nombre_usuario = datos.nombre),
      (usuario.contrasena = datos.contrasena),
      (usuario.email = datos.email),
      (usuario.telefono = datos.telefono),
      await usuario.save();
    return { mensaje: "Actualizado correctamente", estado: 200 };
  }

  public async eliminarUsuario({ request }: HttpContextContract) {
    const id = request.param("id");
    await Usuario.query().where("codigo_usuario", id).delete();
    return { mensaje: "Elimino correctamente", estado: 200 };
  }

  public async filtroPorNombre({ request }: HttpContextContract) {
    const { search } = request.all();
    const users = await Usuario.query().where(
      "nombre_usuario",
      "like",
      `${search}%`
    );
    return users;
  }
}
