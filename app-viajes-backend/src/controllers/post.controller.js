import PostModel from "../models/post.model.js";
import { UserModel } from "../models/user.model.js";
import { validationResult } from "express-validator";

/*VER TODOS LOS POST #########################################################################################*/
export const getAllPost = async (req, res) => {
  try {
    const publicaciones = await PostModel.find().populate("author", ["username", "avatar"]);
    if (publicaciones.length < 1) return res.sendStatus(404);
    res.status(200).json(publicaciones);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al cargar las publicaciones" });
  }
};

/*BUSCAR UN POST POR ID ######################################################################################*/
export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const publicacion = await PostModel.findById(postId).populate("author", ["username", "avatar"]);
    if (publicacion.length < 1) return res.sendStatus(404);
    res.status(200).json({ publicacion });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al cargar la publicación por ID" });
  }
};

/*BUSCAR UN POST POR AUTOR/USUARIO ##########################################################################*/
export const getPostByAuthor = async (req, res) => {
  try {
    // const autor = req.userId;
    const publicaciones = await PostModel.find({ author: req.userId }).populate("author", ["username", "avatar"]);
    console.log("publicaciones: ", publicaciones);

    if (publicaciones.length < 1) return res.sendStatus(404);
    console.log("autor: ", req.userId);
    res.status(200).json(publicaciones);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al cargar la publicaciones por autor" });
  }
};

/*CREAR UN POST ##############################################################################################*/
export const createPost = async (req, res) => {
  try {
    const { title, description, imageURL } = req.body;
    const author = await UserModel.findById(req.userId);
    // Verificar si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newPost = new PostModel({
      author: req.userId,
      title,
      description,
      imageURL,
    });
    //Se aguarda el nuevo usuario creado
    const nuevaPublicacion = await newPost.save();

    res.status(201).json({
      msg: "Publicación creada exitosamente.",
      author: author.username,
      authorId: author._id,
      title: nuevaPublicacion.title,
      description: nuevaPublicacion.description,
      id: nuevaPublicacion._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "No se pudo crear la publicación" });
  }
};

/*ACTUALIZAR UN POST ##########################################################################################*/
export const updatePost = async (req, res) => {
  try {
    // Verificar si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { postId } = req.params;
    const publicacion = req.body;
    const publicacionActualizada = await PostModel.findByIdAndUpdate(postId, publicacion, { new: true });
    res.status(202).json(publicacionActualizada);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "No se pudo editar la publicación" });
  }
};

/*ELIMINAR UN POST ###############################################################################################*/
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await PostModel.findByIdAndDelete(postId);
    res.status(200).json({ message: "Publicación eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "No se pudo eliminar la publicación" });
  }
};
