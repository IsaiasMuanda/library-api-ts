import { Schema, Model, model } from "mongoose";
import type { Iuser } from "./user.interface.ts";
import bcrypt from "bcryptjs";

const UserSchema = new Schema<Iuser>({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "A senha deve ter pelo menos 6 caracteres"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    endereco: {
        type: String,
        trim: true
    },
    telefone: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

UserSchema.pre("save", async function () {
    const user = this as Iuser;

    if (!user.isModified("password")) return;

    const SALT = 10;
    user.password = await bcrypt.hash(this.password, SALT);
});

export const UserModel: Model<Iuser> = model<Iuser>("User", UserSchema);

