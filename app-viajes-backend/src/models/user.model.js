import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    avatar: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    username: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Función para encriptar la contraseña antes de guardar el usuario
UserSchema.statics.encryptPassword = async (password) => {
  const salt = bcrypt.genSaltSync(); //Crea el salt(las vueltas que encripta)
  return await bcrypt.hashSync(password, salt); //Devuelve el password encriptado
};

// Función para comparar la contraseña ingresada con la almacenada en la base de datos
UserSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export const UserModel = model("User", UserSchema);

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   const hash = await bcrypt.hash(this.password, 10);

//   this.password = hash;
//   next();
// });

// Middleware para encriptar la contraseña antes de guardar el usuario
// UserSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await this.constructor.encryptPassword(this.password);
//   }
//   next();
// });
