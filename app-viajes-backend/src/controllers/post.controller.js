import PostModel from "../models/post.model.js";
import { UserModel } from "../models/user.model.js";
import { validationResult } from "express-validator";

/*VER TODOS LOS POST #########################################################################################*/
export const getAllPost = async (req, res) => {
  try {
    const publicaciones = await PostModel.find().populate("author", ["username", "avatar"]);
    // if (publicaciones.length < 1) return res.sendStatus(204);
    // res.status(200).json(publicaciones);
    // return;
    if (publicaciones.length === 0) {
      res.status(204).json({ mensaje: "No hay datos en las publicaciones" });
    } else {
      res.status(200).json(publicaciones);
    }
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: "Error al cargar las publicaciones" });
    // res.status(500).json({ message: error.message });
    res.status(500).json({ error });
    return;
  }
};

/*BUSCAR UN POST POR ID ######################################################################################*/
export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const publicacion = await PostModel.findById(postId).populate("author", ["username", "avatar", "email"]).populate("comments");
    if (!publicacion) return res.sendStatus(204);
    res.status(200).json(publicacion);
    return;
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: "Error al cargar la publicación por ID" });
    // res.status(500).json({ message: error.message });
    res.status(500).json({ error });
    return;
  }
};

/*BUSCAR UN POST POR AUTOR/USUARIO ##########################################################################*/
export const getPostByAuthor = async (req, res) => {
  try {
    //const autor = req.userId;
    const publicaciones = await PostModel.find({ author: req.userId }).populate("author", ["username", "avatar", "email"]);
    // if (publicaciones.length < 1) return res.sendStatus(204);
    // res.status(200).json(publicaciones);
    if (publicaciones.length === 0) {
      // res.status(204).json({ mensaje: "No hay datos en las publicaciones" });
      res.status(204);
    } else {
      res.status(200).json(publicaciones);
    }
    return;
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: error.message });
    res.status(500).json({ error });
    return;
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

    return res.status(201).json({
      author: author.username,
      authorId: author._id,
      title: nuevaPublicacion.title,
      description: nuevaPublicacion.description,
      id: nuevaPublicacion._id,
    });
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: error.message });
    res.status(500).json({ error });
    return;
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
    const publicacionEncontrada = await PostModel.findById(postId);
    console.log(publicacionEncontrada);
    // Verifica si el publicacion existe
    if (!publicacionEncontrada) return res.status(404).json({ message: "Comentario no encontrado." });
    // Verifica si el usuario actual es el autor de la publicacion
    if (!publicacionEncontrada.author.equals(req.userId)) {
      return res.status(401).json({ message: "No tienes permisos para editar este comentario." });
    }
    const publicacionActualizada = await PostModel.findByIdAndUpdate(postId, publicacion, { new: true });
    res.status(202).json(publicacionActualizada);
    return;
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: error.message });
    res.status(500).json({ error });
    return;
  }
};

/*ELIMINAR UN POST ###############################################################################################*/
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const publicacionEncontrada = await PostModel.findById(postId);
    // Verifica si el publicacion existe
    if (!publicacionEncontrada) return res.status(404).json({ message: "Publicación no encontrado." });
    // Verifica si el usuario actual es el autor de la publicacion
    if (!publicacionEncontrada.author.equals(req.userId)) {
      return res.status(403).json({ message: "No tienes permisos para eliminar este comentario." });
    }
    await PostModel.findByIdAndDelete(postId);
    res.status(204).send();
    return;
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: error.message });
    res.status(500).json({ error });
    return;
  }
};
