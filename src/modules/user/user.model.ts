import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { UserEntity } from "./user.interface";

const UserSchema = new Schema<UserEntity>(
    {
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
            minlength: [6, "A senha deve ter pelo menos 6 caracteres"]
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
    },
    { timestamps: true }
);

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const SALT = 10;
    this.password = await bcrypt.hash(this.password, SALT);
});

export const UserModel = model<UserEntity>("User", UserSchema);