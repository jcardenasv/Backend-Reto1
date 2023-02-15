import { DateTime } from "luxon";
import { BaseModel, column, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm";
import Perfil from "./Perfil";

export default class Usuario extends BaseModel {
  @column({ isPrimary: true }) public codigo_usuario: number;
  @column() public nombre_usuario: string;
  @column() public contrasena: string;
  @column() public email: string;
  @column() public telefono: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => Perfil, {
    localKey: "codigo_usuario",
    foreignKey: "codigo_usuario",
  })
  public perfil: HasOne<typeof Perfil>;
}
