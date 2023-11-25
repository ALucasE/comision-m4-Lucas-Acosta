import { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    avatar: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
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

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   const hash = await bcrypt.hash(this.password, 10);

//   this.password = hash;
//   next();
// });

//npm i bcryptjs - https://www.npmjs.com/package/bcryptj
UserSchema.statics.encryptPassword = async (password) => {
  const salt = bcrypt.genSaltSync(); //Crea el salt(las vueltas que encripta)
  return await bcrypt.hashSync(password, salt); //Devuelve el password encriptado
};
//Comparación del password recibido con el encriptado
UserSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export const UserModel = model("User", UserSchema);
